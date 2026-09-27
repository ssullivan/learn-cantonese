/*
 * pitch.js — pitch contours for comparing tones. No dependencies; the
 * math also runs in Node (tools tests load it with a fake `window`).
 *
 *   Pitch.track(samples, sampleRate)  voiced frames [{ t, hz }] (t in s)
 *   Pitch.contour(frames)             [[{ x, st }], ...] segments split at
 *                                     pauses; x is 0..1 across the voiced
 *                                     span, st is semitones from the median
 *   Pitch.fromUrl(url), Pitch.fromBlob(blob)
 *                                     browser: decode, resample to 16 kHz,
 *                                     track → Promise of contour segments
 *   Pitch.svg(lines, { width, height })
 *                                     SVG chart; lines: [{ segments, cls }]
 *
 * Contours are normalized to each speaker's median pitch, so a low voice
 * and a high voice can be compared: match the shape, not the height.
 */
(function (root) {
  const RATE = 16000;
  const FRAME = 512;   // 32 ms
  const HOP = 160;     // 10 ms
  const MIN_HZ = 70;
  const MAX_HZ = 500;
  const MIN_CORR = 0.5;
  const MIN_RUN = 3;   // voiced frames needed to count as a sound
  const GAP = 4;       // unvoiced frames that split segments

  function track(x, sr) {
    const minLag = Math.floor(sr / MAX_HZ);
    const maxLag = Math.ceil(sr / MIN_HZ);
    const frame = Math.round(FRAME * sr / RATE);
    const hop = Math.round(HOP * sr / RATE);

    const rms = [];
    for (let s = 0; s + frame <= x.length; s += hop) {
      let e = 0;
      for (let i = 0; i < frame; i++) e += x[s + i] * x[s + i];
      rms.push(Math.sqrt(e / frame));
    }
    const floor = Math.max(...rms, 0) * 0.05;

    const out = [];
    rms.forEach((r, f) => {
      if (r < floor || r === 0) return;
      const s = f * hop;
      const corr = new Float32Array(maxLag + 2);
      let best = 0;
      for (let lag = minLag; lag <= maxLag + 1 && lag < frame; lag++) {
        let xy = 0, xx = 0, yy = 0;
        for (let i = 0; i < frame - lag; i++) {
          const a = x[s + i], b = x[s + i + lag];
          xy += a * b; xx += a * a; yy += b * b;
        }
        corr[lag] = xx && yy ? xy / Math.sqrt(xx * yy) : 0;
        if (lag <= maxLag && corr[lag] > best) best = corr[lag];
      }
      if (best < MIN_CORR) return;
      // Smallest lag near the best peak: avoids picking a subharmonic.
      let lag = minLag;
      while (lag < maxLag && !(corr[lag] >= 0.9 * best && corr[lag] >= corr[lag - 1] && corr[lag] >= corr[lag + 1])) lag++;
      const a = corr[lag - 1], b = corr[lag], c = corr[lag + 1];
      const shift = a - 2 * b + c ? 0.5 * (a - c) / (a - 2 * b + c) : 0;
      out.push({ t: (s + frame / 2) / sr, hz: sr / (lag + shift), i: f });
    });

    // Drop blips shorter than MIN_RUN frames.
    return out.filter((p, k) => {
      let run = 1;
      for (let j = k - 1; j >= 0 && out[j].i === out[j + 1].i - 1; j--) run++;
      for (let j = k + 1; j < out.length && out[j].i === out[j - 1].i + 1; j++) run++;
      return run >= MIN_RUN;
    });
  }

  const median = list => {
    const s = list.slice().sort((a, b) => a - b);
    return s.length ? s[Math.floor(s.length / 2)] : 0;
  };

  function contour(frames) {
    if (frames.length < MIN_RUN) return [];
    const mid = median(frames.map(f => f.hz));
    const st = frames.map(f => 12 * Math.log2(f.hz / mid));
    const smooth = st.map((_, k) => median(st.slice(Math.max(0, k - 2), k + 3)));
    const t0 = frames[0].t;
    const span = frames[frames.length - 1].t - t0 || 1;
    const segments = [];
    frames.forEach((f, k) => {
      const p = { x: (f.t - t0) / span, st: smooth[k] };
      if (k === 0 || f.i - frames[k - 1].i > GAP) segments.push([p]);
      else segments[segments.length - 1].push(p);
    });
    return segments;
  }

  let ctx = null;
  async function fromArrayBuffer(buf) {
    ctx = ctx || new (root.AudioContext || root.webkitAudioContext)();
    const decoded = await ctx.decodeAudioData(buf);
    const off = new OfflineAudioContext(1, Math.ceil(decoded.duration * RATE), RATE);
    const src = off.createBufferSource();
    src.buffer = decoded;
    src.connect(off.destination);
    src.start();
    const mono = await off.startRendering();
    return contour(track(mono.getChannelData(0), RATE));
  }

  const fromUrl = async url => fromArrayBuffer(await (await fetch(url)).arrayBuffer());
  const fromBlob = async blob => fromArrayBuffer(await blob.arrayBuffer());

  const RANGE = 9; // semitones above/below the median shown on the chart

  function svg(lines, { width = 320, height = 140 } = {}) {
    const pad = 6;
    const X = x => (pad + x * (width - 2 * pad)).toFixed(1);
    const Y = st => (height / 2 - Math.max(-RANGE, Math.min(RANGE, st)) / RANGE * (height / 2 - pad)).toFixed(1);
    const paths = lines.map(({ segments, cls }) => segments.map(seg =>
      `<polyline class="${cls}" fill="none" points="${seg.map(p => `${X(p.x)},${Y(p.st)}`).join(' ')}"/>`).join('')).join('');
    return `<svg class="pitch-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
      <line class="axis" x1="0" x2="${width}" y1="${height / 2}" y2="${height / 2}"/>${paths}</svg>`;
  }

  root.Pitch = { track, contour, fromUrl, fromBlob, svg };
})(typeof window !== 'undefined' ? window : globalThis);
