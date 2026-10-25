import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { heroWorks, samples, type SampleCarousel, type SampleStory } from '@/content';

type MockupProps = {
  title: string;
  subtitle?: string;
  label?: string;
  type: 'dark' | 'light' | 'burgundy';
  format?: '4:5' | '16:9' | '9:16' | '1:1' | '3:4';
  accent?: string;
  tag?: string;
  small?: boolean;
};

export function Mockup({ title, subtitle, label, type, format = '4:5', accent, tag, small }: MockupProps) {
  const bg = type === 'dark' ? 'var(--ink)' : type === 'burgundy' ? 'var(--burgundy)' : 'var(--paper)';
  const textColor = type === 'light' ? 'var(--ink)' : 'var(--paper)';
  const borderStyle = type === 'light' ? '1px solid var(--stone)' : 'none';
  const accentColor = type === 'dark' ? 'var(--stone)' : type === 'burgundy' ? 'var(--stone)' : 'var(--burgundy)';

  const paddingPct = small ? '8%' : '6%';

  return (
    <div
      style={{
        background: bg,
        border: borderStyle,
        borderRadius: 2,
        aspectRatio: format === '4:5' ? '4/5' : format === '16:9' ? '16/9' : format === '9:16' ? '9/16' : format === '1:1' ? '1/1' : '3/4',
        padding: `${paddingPct}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {tag && (
        <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: small ? 8 : 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: accentColor, marginBottom: '1em' }}>
          {tag}
        </div>
      )}
      {label && (
        <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: small ? 9 : 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: accentColor, marginBottom: '0.5em' }}>
          {label}
        </div>
      )}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: small ? 'clamp(0.9rem, 3.5vw, 1.6rem)' : 'clamp(1.1rem, 3vw, 2rem)',
            lineHeight: 1.15,
            color: textColor,
            letterSpacing: '-0.01em',
          }}
        >
          {title.split('*').map((part, i) =>
            i % 2 === 0 ? <span key={i}>{part}</span> : <em key={i} style={{ fontStyle: 'italic', color: accentColor }}>{part}</em>
          )}
        </div>
        {subtitle && (
          <div style={{ fontFamily: 'Inter', fontSize: small ? 9 : 13, color: type === 'light' ? 'rgba(20,17,15,0.7)' : 'rgba(239,233,223,0.7)', marginTop: '0.75em', lineHeight: 1.4 }}>
            {subtitle}
          </div>
        )}
      </div>
      {accent && (
        <div style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: small ? 10 : 14, color: type === 'light' ? 'var(--burgundy)' : 'var(--stone)', marginTop: '1em' }}>
          {accent}
        </div>
      )}
    </div>
  );
}

function getHeroWork(sourceId: string, slideIndex = 0): { src: string; alt: string; width: number; height: number; aspectRatio: string } | null {
  const sample = samples.find(item => item.id === sourceId);
  if (!sample) return null;
  if ('type' in sample) return { src: sample.src, alt: sample.alt, width: sample.width, height: sample.height, aspectRatio: '9 / 16' };
  const slide = sample.slides[slideIndex];
  if (!slide) return null;
  return { src: slide.src, alt: slide.alt, width: 1080, height: 1350, aspectRatio: '4 / 5' };
}

export function HeroMockups() {
  const works = heroWorks.map(work => getHeroWork(work.sampleId, 'slideIndex' in work ? work.slideIndex : 0)).filter((work): work is NonNullable<ReturnType<typeof getHeroWork>> => Boolean(work));
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || works.length < 2) return;
    const timer = window.setInterval(() => setCurrent(index => (index + 1) % works.length), 3200);
    return () => window.clearInterval(timer);
  }, [paused, works.length]);

  return (
    <div className="hero-work-stack" style={{ width: '100%', maxWidth: 360, height: 'clamp(260px, 29.2vw, 420px)', position: 'relative', overflow: 'visible', marginBottom: 32 }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {works.map((work, index) => {
        const offset = (index - current + works.length) % works.length;
        return (
          <motion.div
            key={work.src}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, x: offset * 4, y: offset * -6 - 24, scale: 1 - offset * 0.015, zIndex: works.length - offset }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}
          >
            <img src={work.src} alt={work.alt} width={work.width} height={work.height} loading="eager" draggable={false} style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', aspectRatio: work.aspectRatio, objectFit: 'contain', border: '1px solid var(--stone)', borderRadius: 2 }} />
          </motion.div>
        );
      })}
    </div>
  );
}

export const galleryMockups = [
  { title: 'Как подготовиться к первой *консультации*', type: 'dark' as const, tag: 'Карусель', format: '4:5' as const },
  { title: 'Шаг 1. Сформулируйте *запрос*', type: 'light' as const, tag: 'Карусель', subtitle: 'Запишите, что именно вас беспокоит.', format: '4:5' as const },
  { title: 'Сохраните, чтобы не *потерять*', type: 'burgundy' as const, tag: 'Закрытие', format: '4:5' as const },
  { title: 'Тарелка на *день*: простая схема', type: 'dark' as const, tag: 'Обложка', format: '16:9' as const },
  { title: 'Чек-лист: запуск *программы*', type: 'light' as const, tag: 'Сторис', subtitle: '5 шагов до старта', format: '9:16' as const },
  { title: 'Три этапа *программы*', type: 'dark' as const, tag: 'Презентация', format: '16:9' as const },
  { title: 'Гайд по ведению дневника *питания*', type: 'light' as const, tag: 'PDF-гайд', format: '3:4' as const },
  { title: 'Анна Н. · *Психолог*', type: 'light' as const, tag: 'Шапка', format: '16:9' as const },
];

export function SampleCarouselView({ sample }: { sample: SampleCarousel }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const moveTo = (index: number) => {
    const nextIndex = (index + sample.slides.length) % sample.slides.length;
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: nextIndex * track.clientWidth, behavior: 'smooth' });
    setCurrent(nextIndex);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    setCurrent(Math.round(track.scrollLeft / track.clientWidth));
  };

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => moveTo(current + 1), 3200);
    return () => window.clearInterval(timer);
  }, [current, paused]);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} style={{ minWidth: 0, maxWidth: '100%' }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.1 }}>{sample.title}</h3>
        <p style={{ color: 'rgba(239,233,223,.65)', marginTop: 8 }}>{sample.description}</p>
      </div>
      <div style={{ position: 'relative' }}>
        <div
          ref={trackRef}
          onScroll={handleScroll}
          data-cursor="drag"
          style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', border: '1px solid var(--stone)', borderRadius: 2, touchAction: 'pan-x', overscrollBehaviorX: 'contain' }}
          aria-label={`${sample.title}: ${sample.description}`}
        >
          {sample.slides.map((slide, index) => (
            <div key={slide.src} style={{ minWidth: '100%', aspectRatio: '4 / 5', scrollSnapAlign: 'start', flex: '0 0 100%' }}>
              <img src={slide.src} alt={slide.alt} width={1080} height={1350} loading="lazy" draggable={false} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
              <span className="sr-only">Слайд {index + 1} из {sample.slides.length}</span>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => moveTo(current - 1)} aria-label="Предыдущий слайд" disabled={current === 0} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, border: '1px solid var(--stone)', borderRadius: '50%', background: 'rgba(20,17,15,.72)', color: 'var(--paper)', display: 'grid', placeItems: 'center', opacity: current === 0 ? 0.35 : 1 }}><ArrowLeft size={18} strokeWidth={1.5} /></button>
        <button type="button" onClick={() => moveTo(current + 1)} aria-label="Следующий слайд" disabled={current === sample.slides.length - 1} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, border: '1px solid var(--stone)', borderRadius: '50%', background: 'rgba(20,17,15,.72)', color: 'var(--paper)', display: 'grid', placeItems: 'center', opacity: current === sample.slides.length - 1 ? 0.35 : 1 }}><ArrowRight size={18} strokeWidth={1.5} /></button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }} aria-label="Навигация по слайдам">
        {sample.slides.map((slide, index) => (
          <button key={slide.src} type="button" onClick={() => moveTo(index)} aria-label={`Перейти к слайду ${index + 1}`} aria-current={current === index ? 'true' : undefined} style={{ width: 8, height: 8, padding: 0, border: '1px solid var(--stone)', borderRadius: '50%', background: current === index ? 'var(--stone)' : 'transparent' }} />
        ))}
      </div>
    </motion.div>
  );
}

export function StoryStrip({ stories }: { stories: SampleStory[] }) {
  const [activeStory, setActiveStory] = useState<SampleStory | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activeStory) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveStory(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeStory]);

  const closeStory = () => {
    setActiveStory(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', maxWidth: '100%', overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }} className="story-strip">
        {stories.map(story => (
          <motion.div key={story.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} style={{ flex: '0 0 auto' }}>
            <div className="label" style={{ color: 'var(--paper)', marginBottom: 12 }}>{story.title}</div>
            <button type="button" onClick={(event) => { triggerRef.current = event.currentTarget; setActiveStory(story); }} aria-label={`Открыть ${story.title.toLowerCase()} сторис крупно`} style={{ display: 'inline-block', width: 'auto', height: 'clamp(340px, 50vw, 520px)', aspectRatio: '9 / 16', padding: 0, border: '1px solid var(--stone)', borderRadius: 2, background: 'transparent', overflow: 'hidden', boxShadow: 'none' }}>
              <img src={story.src} alt={story.alt} width={story.width} height={story.height} loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />
            </button>
            <p style={{ fontFamily: 'Inter', fontSize: 14, marginTop: 12, color: 'rgba(239,233,223,.7)' }}>Сторис</p>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {activeStory && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={activeStory.alt} onClick={closeStory} style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'grid', placeItems: 'center', padding: 24, background: 'rgba(20,17,15,.92)' }}>
            <button type="button" onClick={closeStory} aria-label="Закрыть просмотр сторис" style={{ position: 'absolute', top: 24, right: 24, width: 44, height: 44, display: 'grid', placeItems: 'center', border: '1px solid var(--stone)', borderRadius: 2, background: 'transparent', color: 'var(--paper)' }}><X size={22} strokeWidth={1.5} /></button>
            <img src={activeStory.src} alt={activeStory.alt} width={activeStory.width} height={activeStory.height} onClick={event => event.stopPropagation()} style={{ display: 'block', maxWidth: '100%', maxHeight: '90vh', width: 'auto', height: 'auto', objectFit: 'contain', border: '1px solid var(--stone)', borderRadius: 2 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function FeedGrid() {
  const feedItems = [
    { title: 'Как справляться с *тревогой*', type: 'dark' as const },
    { title: 'Один шаг к *ресурсу*', type: 'light' as const, subtitle: 'Короткая практика для утра' },
    { title: 'Запишитесь на *консультацию*', type: 'burgundy' as const },
    { title: 'Три вопроса к себе на *неделю*', type: 'light' as const },
    { title: 'Почему *отдых* не помогает', type: 'dark' as const },
    { title: 'Сохраните и *поделитесь*', type: 'burgundy' as const },
    { title: 'Границы: что это и *зачем*', type: 'dark' as const },
    { title: 'Цитата: «Забота о себе — *не эгоизм*»', type: 'light' as const },
    { title: 'Записаться на *программу*', type: 'burgundy' as const },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
      {feedItems.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group relative"
        >
          <Mockup
            title={item.title}
            subtitle={item.subtitle}
            type={item.type}
            format="4:5"
            small
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'var(--ink)',
            color: 'var(--paper)',
            fontFamily: 'Inter',
            fontSize: 10,
            fontWeight: 500,
            padding: '4px 8px',
            opacity: 0,
            transition: 'opacity 300ms',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
            className="group-hover:opacity-100"
          >
            {item.type === 'dark' ? 'Обложка' : item.type === 'burgundy' ? 'Призыв' : 'Слайд'}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
