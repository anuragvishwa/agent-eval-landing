import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

// Every image on the page opens full screen: click it, then click anywhere,
// the close button or Escape to go back.
export function Zoom() {
  const [img, setImg] = useState(null);

  useEffect(() => {
    const open = (e) => {
      const el = e.target.closest?.('main img');
      if (!el || el.closest('a, button')) return;
      setImg({ src: el.currentSrc || el.src, alt: el.alt });
    };
    const esc = (e) => { if (e.key === 'Escape') setImg(null); };
    document.addEventListener('click', open);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('click', open); document.removeEventListener('keydown', esc); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = img ? 'hidden' : '';
  }, [img]);

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          key="zoom"
          role="dialog"
          aria-modal="true"
          aria-label={img.alt || 'Image'}
          className="fixed inset-0 z-[100] overflow-auto bg-[#0b0b12]/80 backdrop-blur-md cursor-zoom-out"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={() => setImg(null)}
        >
          <button type="button" aria-label="Close" className="fixed top-4 right-5 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white grid place-items-center">
            <X className="w-5 h-5" />
          </button>
          <motion.img
            src={img.src}
            alt={img.alt}
            className="block w-[min(1600px,calc(100vw-48px))] h-auto mx-auto my-10 rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,.6)]"
            initial={{ scale: 0.94, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
          {img.alt && <p className="fixed left-0 right-0 bottom-4 text-center text-sm text-white/75 pointer-events-none">{img.alt}</p>}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
