// Soft, painterly backdrops for product shots: layered gradients that read as a
// sky, a horizon and hills, with a film grain on top. Pure CSS, no image files.

const GRAIN = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .55 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>',
)}")`;

// Each scene: sky (top), haze and sun, then two hill bands at the bottom.
const SCENES = {
  dawn: {
    sky: 'linear-gradient(180deg,#f6dccb 0%,#efd9ee 45%,#e7e2fb 100%)',
    glow: 'radial-gradient(60% 45% at 22% 18%,rgba(255,236,214,.95),transparent 70%),radial-gradient(45% 40% at 82% 12%,rgba(214,206,255,.8),transparent 70%)',
    hills: ['#d9cbef', '#c7b8ea'],
  },
  meadow: {
    sky: 'linear-gradient(180deg,#eef1de 0%,#e3ebd2 55%,#d8e4c4 100%)',
    glow: 'radial-gradient(55% 45% at 75% 15%,rgba(255,250,224,.95),transparent 70%)',
    hills: ['#c9d9ac', '#b3c98f'],
  },
  mist: {
    sky: 'linear-gradient(180deg,#e7ecf2 0%,#d8e0ea 55%,#cbd5e1 100%)',
    glow: 'radial-gradient(70% 40% at 50% 30%,rgba(255,255,255,.85),transparent 70%)',
    hills: ['#bccadb', '#a8b9cd'],
  },
  valley: {
    sky: 'linear-gradient(180deg,#f8e1e4 0%,#f0d6e3 50%,#e6cfe6 100%)',
    glow: 'radial-gradient(50% 40% at 30% 20%,rgba(255,240,232,.95),transparent 70%)',
    hills: ['#e2bfd6', '#d3abc9'],
  },
  golden: {
    sky: 'linear-gradient(180deg,#f9ead0 0%,#f4dcb4 55%,#ecca98 100%)',
    glow: 'radial-gradient(45% 40% at 70% 22%,rgba(255,246,220,1),transparent 70%)',
    hills: ['#e2b97f', '#d4a466'],
  },
  cloud: {
    sky: 'linear-gradient(180deg,#dcebfb 0%,#e9f2fc 60%,#f4f8fd 100%)',
    glow: 'radial-gradient(35% 25% at 25% 28%,rgba(255,255,255,1),transparent 70%),radial-gradient(40% 26% at 72% 18%,rgba(255,255,255,.95),transparent 70%)',
    hills: ['#c9dbef', '#b6cce6'],
  },
};

export function Art({ scene = 'dawn', className = '', children }) {
  const s = SCENES[scene] ?? SCENES.dawn;
  return (
    <div className={`relative isolate overflow-hidden rounded-[28px] ${className}`} style={{ background: s.sky }}>
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: s.glow }} />
      <div
        aria-hidden
        className="absolute -z-10 left-[-10%] right-[-10%] bottom-[-30%] h-[60%] rounded-[50%]"
        style={{ background: s.hills[0], filter: 'blur(2px)', opacity: 0.75 }}
      />
      <div
        aria-hidden
        className="absolute -z-10 left-[30%] right-[-25%] bottom-[-38%] h-[55%] rounded-[50%]"
        style={{ background: s.hills[1], filter: 'blur(1px)', opacity: 0.7 }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 mix-blend-multiply opacity-[.18]" style={{ backgroundImage: GRAIN }} />
      {children}
    </div>
  );
}

/** A console screenshot set on a scene, cropped to its top. */
export function Shot({ src, alt, scene, ratio = 'aspect-[16/11]' }) {
  return (
    <Art scene={scene} className="p-5 sm:p-8">
      <div className={`relative ${ratio} rounded-[14px] overflow-hidden bg-white shadow-[0_30px_70px_-30px_rgba(30,20,60,.45)] ring-1 ring-black/5`}>
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top" />
      </div>
    </Art>
  );
}
