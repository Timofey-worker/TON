import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { stats } from '@/content';

function Counter({ target, accent }: { target: number; accent: boolean }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const duration = 800;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span
      ref={ref}
      className="price-num"
      style={{
        fontSize: 'var(--text-price)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
        color: accent ? 'var(--burgundy)' : 'var(--ink)',
        display: 'block',
      }}
    >
      {value}
    </span>
  );
}

export default function Stats() {
  return (
    <section
      aria-label="Цифры студии"
      style={{
        borderTop: '1px solid var(--stone)',
        borderBottom: '1px solid var(--stone)',
        background: 'var(--paper)',
        padding: 'clamp(48px, 7vw, 96px) 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '48px 32px',
          }}
        >
          {stats.map((s, i) => (
            <div key={i}>
              <Counter target={s.num} accent={s.accent} />
              <p
                style={{
                  fontFamily: 'Inter',
                  fontSize: 16,
                  lineHeight: '24px',
                  color: 'rgba(20,17,15,0.7)',
                  marginTop: 12,
                  maxWidth: '20ch',
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
