import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring, motion } from 'framer-motion';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const [variant, setVariant] = useState<'dot' | 'ring' | 'drag'>('dot');

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('[data-cursor="drag"]')) {
        setVariant('drag');
      } else if (target.closest('a, button, [role="button"], label[for], select')) {
        setVariant('ring');
      } else if (target.closest('input, textarea, [contenteditable]')) {
        setVariant('dot');
      } else {
        setVariant('dot');
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [x, y]);

  const variants = {
    dot: { width: 10, height: 10, backgroundColor: '#14110F', border: '0px solid transparent' },
    ring: { width: 48, height: 48, backgroundColor: 'transparent', border: '1px solid #14110F' },
    drag: { width: 72, height: 72, backgroundColor: 'transparent', border: '1px solid #14110F' },
  };

  return (
    <motion.div
      id="custom-cursor"
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        borderRadius: '9999px',
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      animate={variants[variant]}
      transition={{ duration: 0.2, ease: [0.65, 0, 0.35, 1] }}
    >
      {variant === 'drag' && (
        <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 500, color: '#14110F', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
          Тянуть
        </span>
      )}
    </motion.div>
  );
}
