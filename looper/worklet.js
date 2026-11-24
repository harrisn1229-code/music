/* Looper capture: runs on the audio thread. Everything the input hears is passed to the page in
   blocks of 2048 frames, each stamped with the context frame it started on, so the page can cut
   any stretch of it by context time, to the sample. Nothing here decides what is kept. */
class LooperCapture extends AudioWorkletProcessor {
  constructor() {
    super();
    this.size = 2048;
    this.buf = new Float32Array(this.size);
    this.n = 0;
    this.at = 0;
    this.ch = "mix";                  // "mix" | 0 | 1
    this.port.onmessage = (e) => { if (e.data && e.data.ch != null) this.ch = e.data.ch; };
  }
  process(inputs) {
    const inp = inputs[0] || [], chs = inp.length, len = chs ? inp[0].length : 128;
    if (this.n === 0) this.at = currentFrame;
    const b = this.buf, n = this.n;
    if (!chs) {
      b.fill(0, n, n + len);                       // no input yet: keep the timeline whole
    } else if (this.ch === 1 && chs > 1) {
      b.set(inp[1], n);
    } else if (this.ch === "mix" && chs > 1) {
      const a = inp[0], c = inp[1];
      for (let i = 0; i < len; i++) b[n + i] = (a[i] + c[i]) * 0.5;
    } else {
      b.set(inp[0], n);
    }
    this.n += len;
    if (this.n >= this.size) {
      this.port.postMessage({ f: this.at, d: b }, [b.buffer]);
      this.buf = new Float32Array(this.size);
      this.n = 0;
    }
    return true;
  }
}
registerProcessor("looper-capture", LooperCapture);
