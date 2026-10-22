import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

// The 40-second film, in a full-screen player. It has its own address,
// lumniverse.com/#film, so it can be shared; the hero and footer link to it.
export const FILM_SRC = '/lumni/contracts-film.mp4';
export const FILM_POSTER = '/lumni/contracts-film-poster.webp';
export const openFilm = () => { window.location.hash = 'film'; };

export function Film() {
  const [open, setOpen] = useState(() => window.location.hash === '#film');
  const video = useRef(null);

  useEffect(() => {
    const sync = () => setOpen(window.location.hash === '#film');
    const esc = (e) => { if (e.key === 'Escape' && window.location.hash === '#film') close(); };
    window.addEventListener('hashchange', sync);
    document.addEventListener('keydown', esc);
    return () => { window.removeEventListener('hashchange', sync); document.removeEventListener('keydown', esc); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) video.current?.play().catch(() => {});
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="film"
          role="dialog"
          aria-modal="true"
          aria-label="Lumni Outcome contracts, the film"
          className="fixed inset-0 z-[110] grid place-items-center bg-[#0b0b12]/85 backdrop-blur-md p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <button type="button" onClick={close} aria-label="Close" className="fixed top-4 right-5 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white grid place-items-center">
            <X className="w-5 h-5" />
          </button>
          <motion.video
            ref={video}
            src={FILM_SRC}
            poster={FILM_POSTER}
            controls
            autoPlay
            playsInline
            className="w-full max-w-[1280px] aspect-video rounded-2xl bg-black shadow-[0_40px_120px_rgba(0,0,0,.6)]"
            initial={{ scale: 0.94, y: 14 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Close the film, leaving the address as it was before it opened. */
function close() {
  if (window.location.hash !== '#film') return;
  const url = window.location.pathname + window.location.search;
  window.history.replaceState(null, '', url);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}
