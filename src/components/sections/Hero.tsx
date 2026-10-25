import { motion } from 'framer-motion';
import { RevealLine, Reveal } from '@/components/Reveal';
import { HeroMockups } from '@/components/Mockups';

type HeroProps = {
  onCta: () => void;
  onTariffs: () => void;
};

export default function Hero({ onCta, onTariffs }: HeroProps) {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      style={{ background: 'var(--paper)', paddingTop: 'calc(72px + clamp(48px, 8vw, 120px))', paddingBottom: 'var(--section-v)' }}
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start lg:items-end">
          {/* Left: text */}
          <div style={{ flex: '1 1 0', minWidth: 0 }}>
            <Reveal>
              <div className="label" style={{ color: 'var(--ink)', opacity: 0.7, marginBottom: 32 }}>
                ДИЗАЙН-ОТДЕЛ ПО ПОДПИСКЕ
              </div>
            </Reveal>

            <h1
              id="hero-heading"
              aria-label="Вы пишете. Мы оформляем."
              style={{ marginBottom: 32 }}
            >
              <RevealLine
                as="span"
                delay={0.1}
                className="block"
              >
                <span style={{ fontSize: 'var(--text-display)', lineHeight: 1.0, letterSpacing: '-0.025em', display: 'block', overflowWrap: 'break-word' }}>
                  Вы пишете.
                </span>
              </RevealLine>
              <RevealLine
                as="span"
                delay={0.2}
                className="block"
              >
                <span style={{ fontSize: 'var(--text-display)', lineHeight: 1.0, letterSpacing: '-0.025em', display: 'block', overflowWrap: 'break-word' }}>
                  Мы <em style={{ fontStyle: 'italic', color: 'var(--burgundy)' }}>оформляем.</em>
                </span>
              </RevealLine>
            </h1>

            <Reveal delay={0.4}>
              <p style={{ fontSize: 'var(--text-lead)', lineHeight: 1.5, maxWidth: '56ch', marginBottom: 40 }}>
                Студия «Тон» делает карусели, обложки, презентации и гайды для экспертов и бизнесов. Единый стиль, первый макет за 48 часов, цена известна заранее.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="flex flex-wrap gap-4" style={{ marginBottom: 24 }}>
                <button
                  onClick={onCta}
                  className="btn-primary"
                  style={{
                    background: 'var(--burgundy)',
                    color: 'var(--paper)',
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: 16,
                    letterSpacing: '0.01em',
                    padding: '20px 36px',
                    borderRadius: 2,
                    border: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>Оставить заявку</span>
                  <span className="btn-fill" style={{ position: 'absolute', inset: 0, background: 'var(--ink)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 400ms cubic-bezier(0.65,0,0.35,1)' }} />
                </button>
                <button
                  onClick={() => scrollTo('#tariffs')}
                  style={{
                    background: 'transparent',
                    color: 'var(--ink)',
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: 16,
                    letterSpacing: '0.01em',
                    padding: '20px 36px',
                    borderRadius: 2,
                    border: '1px solid var(--ink)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  className="btn-secondary"
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>Смотреть тарифы</span>
                  <span className="btn-fill-ink" style={{ position: 'absolute', inset: 0, background: 'var(--ink)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 400ms cubic-bezier(0.65,0,0.35,1)' }} />
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.6}>
              <p style={{ fontSize: 16, color: 'rgba(20,17,15,0.7)' }}>
                Для подходящих экспертов делаем образец карусели по вашей теме до оплаты.
              </p>
            </Reveal>
          </div>

          {/* Right: mockups */}
          <Reveal delay={0.3} className="lg:w-80 xl:w-96 w-full max-w-xs mx-auto lg:mx-0 flex-shrink-0">
            <HeroMockups />
          </Reveal>
        </div>

        {/* Meta row */}
        <Reveal delay={0.7}>
          <div
            className="flex justify-between items-center"
            style={{ marginTop: 64, paddingTop: 24, borderTop: '1px solid var(--stone)' }}
          >
            <span style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(20,17,15,0.5)' }}>Студия «Тон», 2026</span>
            <span style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(20,17,15,0.5)' }}>Листайте ↓</span>
          </div>
        </Reveal>
      </div>

      <style>{`
        .btn-primary:hover .btn-fill { transform: scaleX(1) !important; }
        .btn-secondary:hover .btn-fill-ink { transform: scaleX(1) !important; }
        .btn-secondary:hover span:first-child { color: var(--paper) !important; }
      `}</style>
    </section>
  );
}
