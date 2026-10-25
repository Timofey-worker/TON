import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { RevealLine, Reveal } from '@/components/Reveal';

const statements = [
  'Вечера уходят на карусели, а не на тексты и приём.',
  'Каждый пост выглядит по-новому, и блог не складывается в серию.',
  'Фрилансер пропал за день до запуска вебинара.',
  'Регулярность держится на настроении, а настроение не всегда есть.',
];

function WordReveal({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.4'],
  });

  const words = text.split(' ');

  return (
    <div
      ref={ref}
      style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'var(--text-h3)',
        lineHeight: 1.15,
        letterSpacing: '-0.01em',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.25em',
        maxWidth: '20ch',
      }}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <WordItem key={i} progress={scrollYProgress} start={start} end={end} word={word} />
        );
      })}
    </div>
  );
}

function WordItem({ progress, start, end, word }: { progress: any; start: number; end: number; word: string }) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <motion.span style={{ opacity }}>
      {word}
    </motion.span>
  );
}

export default function Problem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      style={{ background: 'var(--paper)', paddingTop: 'var(--section-v)', paddingBottom: 'var(--section-v)' }}
    >
      <div className="container">
        <Reveal>
          <div className="label" style={{ color: 'rgba(20,17,15,0.7)', marginBottom: 24 }}>01 / ПРОБЛЕМА</div>
        </Reveal>

        <div style={{ marginBottom: 64 }}>
          <RevealLine as="h2" delay={0.1}>
            <span style={{ fontSize: 'var(--text-h2)', lineHeight: 1.02, letterSpacing: '-0.02em', display: 'block' }}>
              Оформление съедает время,
            </span>
          </RevealLine>
          <RevealLine as="h2" delay={0.2}>
            <span style={{ fontSize: 'var(--text-h2)', lineHeight: 1.02, letterSpacing: '-0.02em', display: 'block' }}>
              которое нужно <em style={{ fontStyle: 'italic', color: 'var(--burgundy)' }}>клиентам</em>
            </span>
          </RevealLine>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
          {statements.map((s, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--stone)', paddingTop: 32 }}>
              <WordReveal text={s} />
            </div>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div style={{ marginTop: 80, borderTop: '1px solid var(--stone)', paddingTop: 32 }}>
            <p style={{ fontSize: 'var(--text-lead)', lineHeight: 1.5, maxWidth: '56ch' }}>
              Для этого и нужен дизайн-отдел: вы пишете, мы оформляем.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
