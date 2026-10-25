import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroCurtain({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);
  const [lifting, setLifting] = useState(false);

  useEffect(() => {
    let shown = false;
    try {
      shown = !!sessionStorage.getItem('ton-intro-shown');
    } catch {}

    if (shown) {
      setShow(false);
      onDone();
      return;
    }

    const timeout1 = setTimeout(() => setLifting(true), 600);
    const timeout2 = setTimeout(() => {
      setShow(false);
      onDone();
      try { sessionStorage.setItem('ton-intro-shown', '1'); } catch {}
    }, 1400);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [onDone]);

  const skip = () => {
    setShow(false);
    onDone();
    try { sessionStorage.setItem('ton-intro-shown', '1'); } catch {}
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') skip();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        onClick={skip}
        animate={{ y: lifting ? '-100%' : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--ink)',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="mask">
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              display: 'block',
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(6rem, 20vw, 18rem)',
              color: 'var(--paper)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            Тон
          </motion.span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
