import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { steps } from '@/content';
import { Reveal } from '@/components/Reveal';

function useReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return mobile;
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      style={{ background: 'var(--paper)', padding: 'var(--section-v) 0' }}
    >
      <div className="container">
        <Reveal>
          <div className="label" style={{ color: 'rgba(20,17,15,0.7)', marginBottom: 24 }}>02 / ПРОЦЕСС</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            id="process-heading"
            style={{ fontSize: 'var(--text-h2)', lineHeight: 1.02, letterSpacing: '-0.02em', marginBottom: 80 }}
          >
            Пять шагов от текста до <em style={{ color: 'var(--burgundy)', fontStyle: 'italic' }}>готового</em> макета
          </h2>
        </Reveal>

        {mobile ? (
          <MobileSteps />
        ) : (
          <DesktopSteps reduced={reduced} />
        )}

        <Reveal>
          <p
            style={{
              fontFamily: 'Inter',
              fontSize: 16,
              color: 'rgba(20,17,15,0.6)',
              marginTop: 80,
              paddingTop: 32,
              borderTop: '1px solid var(--stone)',
            }}
          >
            Работа начинается после предоплаты за месяц.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function MobileSteps() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, minWidth: 0, maxWidth: '100%' }}>
      {steps.map((step, i) => (
        <Reveal key={step.num} delay={i * 0.1}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 16,
              paddingBottom: 48,
              borderBottom: i < steps.length - 1 ? '1px solid var(--stone)' : 'none',
              marginBottom: i < steps.length - 1 ? 48 : 0,
            }}
          >
            <span
              className="price-num"
              style={{
                fontSize: 'clamp(4rem, 18vw, 6rem)',
                lineHeight: 0.85,
                color: 'rgba(20,17,15,0.12)',
                letterSpacing: '-0.04em',
              }}
            >
              {step.num}
            </span>
            <div style={{ minWidth: 0 }}>
              <h3
                style={{
                  fontSize: 'clamp(1.25rem, 2.6vw, 1.75rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  marginBottom: 12,
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: 16, lineHeight: '26px', color: 'rgba(20,17,15,0.75)', maxWidth: '100%', minWidth: 0, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                {step.text}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function DesktopSteps({ reduced }: { reduced: boolean }) {
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Progress line */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 1,
          background: 'var(--stone)',
        }}
      />

      {steps.map((step, i) => (
        <StepRow key={step.num} step={step} index={i} reduced={reduced} />
      ))}
    </div>
  );
}

function StepRow({ step, index, reduced }: { step: typeof steps[0]; index: number; reduced: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useRef(false);

  return (
    <Reveal delay={index * 0.12}>
      <div
        ref={rowRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(200px, 22vw, 320px) 1fr',
          gap: '0 80px',
          paddingLeft: 40,
          paddingBottom: index < steps.length - 1 ? 80 : 0,
          paddingTop: index === 0 ? 0 : 80,
          borderBottom: index < steps.length - 1 ? '1px solid var(--stone)' : 'none',
        }}
      >
        {/* Left: giant number */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span
            className="price-num"
            style={{
              fontSize: 'clamp(5rem, 14vw, 12rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              color: 'rgba(20,17,15,0.1)',
            }}
          >
            {step.num}
          </span>
          <h3
            style={{
              fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            {step.title}
          </h3>
        </div>

        {/* Right: text */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p
            style={{
              fontFamily: 'Inter',
              fontSize: 18,
              lineHeight: '28px',
              color: 'rgba(20,17,15,0.75)',
              maxWidth: '52ch',
            }}
          >
            {step.text}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
