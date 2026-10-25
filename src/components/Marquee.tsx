import { marqueeServices } from '@/content';

type MarqueeRowProps = {
  reverse?: boolean;
};

function MarqueeRow({ reverse = false }: MarqueeRowProps) {
  const items = [...marqueeServices, ...marqueeServices];
  return (
    <div className="marquee-window" onMouseEnter={event => event.currentTarget.classList.add('is-paused')} onMouseLeave={event => event.currentTarget.classList.remove('is-paused')}>
      <div className={`marquee-track ${reverse ? 'marquee-track-reverse' : ''}`}>
        {items.map((service, index) => (
          <span key={`${service}-${index}`} className="marquee-item">
            <span style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 7vw, 6rem)', color: 'var(--paper)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{service}</span>
            <span style={{ color: 'var(--stone)', fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: 1 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeSection() {
  return (
    <section
      aria-label="Виды работ"
      style={{ background: 'var(--ink)', overflow: 'hidden' }}
      className="py-8"
    >
      <MarqueeRow />
      <MarqueeRow reverse />
    </section>
  );
}
