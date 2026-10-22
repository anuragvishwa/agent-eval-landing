import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { APP_URL } from '../lib/links';
import { Art } from './Art';

// The whole console, live, in demo mode: it opens on Today and every screen
// is a click away in its own top bar. It's laid out at its real width (1440)
// and scaled to fit, and only loads as it comes near the screen. In a frame,
// the console stays on made-up data and hides the way to a real workspace.

const W = 1440;
// Local dev frames a local console (run it with LUMNI_CONSOLE_FRAME_ANCESTORS
// set to this site's origin); everywhere else, the real one.
const ORIGIN = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname) ? 'http://localhost:5200' : APP_URL;
const START = `${ORIGIN}/today?data=mock&volume=mid`;

export function LiveDemo() {
  const box = useRef(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(760);
  const [near, setNear] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    const fit = () => {
      const k = el.clientWidth / W;
      setScale(k);
      setHeight(el.clientHeight / k);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setNear(true); io.disconnect(); } }, { rootMargin: '500px' });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  return (
    <section id="demo" className="px-5 sm:px-6 pt-4 sm:pt-8 pb-20 sm:pb-28 scroll-mt-16">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-wrap items-end gap-4 mb-6 sm:mb-8">
          <div>
            <div className="text-sm font-semibold text-lm-accent mb-2">Live demo</div>
            <h2 className="text-[30px] sm:text-[40px] font-semibold tracking-[-0.035em] leading-[1.08]">The real console. Click anything.</h2>
            <p className="mt-3 text-[17px] text-lm-ink2 max-w-2xl">A made-up company’s day with Lumni: every screen, live. Nothing here touches a real account.</p>
          </div>
          <a href={`${ORIGIN}/today?data=mock`} target="_blank" rel="noopener" className="ml-auto inline-flex items-center gap-1.5 text-[15px] font-semibold text-lm-ink2 hover:text-lm-ink">
            Open full screen <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <Art scene="cloud" className="p-2.5 sm:p-6 lg:p-8">
            <div className="rounded-[16px] overflow-hidden bg-white ring-1 ring-black/5 shadow-[0_40px_90px_-30px_rgba(30,20,60,.5)]">
              <div className="h-10 flex items-center gap-2 px-4 bg-[#ececf2]">
                <i className="w-3 h-3 rounded-full bg-[#ff5f57]" /><i className="w-3 h-3 rounded-full bg-[#febc2e]" /><i className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="mx-auto text-[13px] text-[#6a6f7d]">app.lumniverse.com</span>
                <span className="text-xs font-semibold text-lm-accent bg-lm-soft px-2.5 py-0.5 rounded-full">Demo</span>
              </div>
              <div ref={box} className="relative h-[420px] sm:h-[620px] lg:h-[760px] overflow-hidden bg-[#f4f4f7]">
                {near && (
                  <iframe
                    title="Lumni console, live demo"
                    src={START}
                    onLoad={() => setLoaded(true)}
                    className="absolute left-0 top-0 border-0 origin-top-left"
                    style={{ width: W, height, transform: `scale(${scale})` }}
                  />
                )}
                <div className={`absolute inset-0 grid place-content-center justify-items-center gap-3 text-sm text-lm-ink2 bg-[#f4f4f7] transition-opacity duration-500 ${loaded ? 'opacity-0 pointer-events-none' : ''}`}>
                  <span className="w-6 h-6 rounded-full border-2 border-lm-line border-t-lm-accent animate-spin" />
                  Loading the live demo…
                </div>
              </div>
            </div>
          </Art>
        </motion.div>
      </div>
    </section>
  );
}
