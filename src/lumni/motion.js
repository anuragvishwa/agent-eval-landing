// Animate unless the visitor asked for reduced motion. `?motion=1` forces it (for previews).
export function canAnimate() {
  if (typeof window === 'undefined') return false;
  if (new URLSearchParams(window.location.search).get('motion') === '1') return true;
  return !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export const COL = {
  ink: '#0d0e14', ink2: '#6a6f7d', ink3: '#a3a7b3', line: '#e8e8ee', line2: '#d9dae2',
  accent: '#5b4bf5', accent2: '#8578ff', bad: '#e5484d', warn: '#f08a24', allow: '#16a34a',
};

export function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Keeps a canvas sized to its parent at device pixel ratio. Returns a cleanup. */
export function fitCanvas(canvas, onSize) {
  const parent = canvas.parentElement;
  const resize = () => {
    const r = parent.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    canvas.style.width = `${r.width}px`;
    canvas.style.height = `${r.height}px`;
    onSize(r.width, r.height, dpr);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(parent);
  resize();
  return () => ro.disconnect();
}

/** Runs `frame(dt)` while the element is on screen. Returns a cleanup. */
export function loopWhileVisible(el, frame) {
  let raf = 0;
  let last = 0;
  const tick = (now) => {
    const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
    last = now;
    frame(dt);
    raf = requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(([e]) => {
    cancelAnimationFrame(raf);
    last = 0;
    if (e.isIntersecting) raf = requestAnimationFrame(tick);
  });
  io.observe(el);
  return () => {
    io.disconnect();
    cancelAnimationFrame(raf);
  };
}
