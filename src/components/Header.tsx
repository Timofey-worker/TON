import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#services', label: 'Услуги' },
  { href: '#samples', label: 'Образцы' },
  { href: '#tariffs', label: 'Тарифы' },
  { href: '#faq', label: 'Вопросы' },
];

export default function Header({ onCta }: { onCta: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 50);
      if (y > lastY.current && y > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          transformOrigin: 'left',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'var(--burgundy)',
          zIndex: 1000,
        }}
      />

      <motion.header
        style={{ background: atTop ? 'transparent' : 'var(--paper)' }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
        role="banner"
        aria-label="Шапка сайта"
        data-headstyle={atTop ? '' : 'solid'}
      >
        <div
          className="container flex items-center justify-between"
          style={{ height: 72, borderBottom: atTop ? 'none' : '1px solid var(--stone)' }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            aria-label="Тон — на главную"
            style={{ minWidth: 80 }}
          >
            <span
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 32,
                color: 'var(--burgundy)',
                lineHeight: 1,
              }}
            >
              Тон
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-8" aria-label="Основная навигация">
            {navLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={e => { e.preventDefault(); scrollTo(l.href); }}
                style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--ink)' }}
                className="relative group"
              >
                {l.label}
                <span
                  className="absolute bottom-0 left-0 w-full h-px"
                  style={{ background: 'var(--ink)', transformOrigin: 'left', transform: 'scaleX(0)', transition: 'transform 300ms ease' }}
                />
                <style>{`a:hover > span { transform: scaleX(1) !important; }`}</style>
              </a>
            ))}
          </nav>

          {/* CTA button */}
          <button
            onClick={onCta}
            className="hidden md:block btn-primary"
            style={{
              background: 'var(--burgundy)',
              color: 'var(--paper)',
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: 16,
              letterSpacing: '0.01em',
              padding: '12px 28px',
              borderRadius: 2,
              border: 'none',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>Оставить заявку</span>
            <span
              className="btn-fill"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--ink)',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 400ms cubic-bezier(0.65,0,0.35,1)',
              }}
            />
          </button>

          {/* Burger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
          >
            <span style={{ display: 'block', width: 24, height: 1, background: 'var(--ink)', transition: 'transform 300ms', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ display: 'block', width: 24, height: 1, background: 'var(--ink)', opacity: menuOpen ? 0 : 1, transition: 'opacity 300ms' }} />
            <span style={{ display: 'block', width: 24, height: 1, background: 'var(--ink)', transition: 'transform 300ms', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'var(--paper)',
              zIndex: 49,
              display: 'flex',
              flexDirection: 'column',
              padding: '120px var(--container-px) 48px',
            }}
          >
            <nav aria-label="Мобильное меню">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={e => { e.preventDefault(); scrollTo(l.href); }}
                    style={{
                      display: 'block',
                      fontFamily: '"Playfair Display", serif',
                      fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                      color: 'var(--ink)',
                      marginBottom: '0.5em',
                    }}
                  >
                    {l.label}
                  </a>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{ marginTop: 'auto' }}
            >
              <button
                onClick={() => { setMenuOpen(false); onCta(); }}
                style={{
                  background: 'var(--burgundy)',
                  color: 'var(--paper)',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: 16,
                  padding: '16px 32px',
                  borderRadius: 2,
                  border: 'none',
                  width: '100%',
                }}
              >
                Оставить заявку
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .btn-primary:hover .btn-fill {
          transform: scaleX(1) !important;
        }
        nav a:hover > span {
          transform: scaleX(1) !important;
        }
      `}</style>
    </>
  );
}
