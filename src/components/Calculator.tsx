import { useMemo, useState } from 'react';
import { services, tariffs, plural } from '@/content';

type CalculatorProps = { onChoose: (tariff: string) => void };

export default function Calculator({ onChoose }: CalculatorProps) {
  const [counts, setCounts] = useState<number[]>(services.map(() => 0));
  const total = useMemo(() => counts.reduce((sum, count, index) => sum + count * services[index].points, 0), [counts]);
  const recommendation = total === 0 ? null : total <= 10 ? tariffs[0] : total <= 20 ? tariffs[1] : total <= 35 ? tariffs[2] : null;
  const limit = recommendation?.points ?? 35;

  const update = (index: number, delta: number) => {
    setCounts(current => current.map((count, itemIndex) => itemIndex === index ? Math.max(0, Math.min(20, count + delta)) : count));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(280px, .65fr)', gap: 48, alignItems: 'start' }} className="calculator-grid">
      <div style={{ borderTop: '1px solid var(--stone)' }}>
        {services.map((service, index) => (
          <div key={service.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 24, alignItems: 'center', padding: '18px 0', borderBottom: '1px solid var(--stone)' }}>
            <div><span style={{ color: 'rgba(20,17,15,.55)', fontSize: 14, marginRight: 16 }}>{service.num}</span><span style={{ fontFamily: 'Playfair Display', fontSize: 22 }}>{service.name}</span></div>
            <span style={{ fontSize: 14, color: 'rgba(20,17,15,.65)' }}>{service.points} {plural(service.points, 'балл', 'балла', 'баллов')}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button aria-label={`Уменьшить ${service.name}`} onClick={() => update(index, -1)} style={stepperStyle}>−</button>
              <span style={{ minWidth: 20, textAlign: 'center' }}>{counts[index]}</span>
              <button aria-label={`Увеличить ${service.name}`} onClick={() => update(index, 1)} style={stepperStyle}>+</button>
            </div>
          </div>
        ))}
        <p style={{ fontSize: 14, color: 'rgba(20,17,15,.6)', marginTop: 20 }}>Расчёт ориентировочный. Итоговый набор вы собираете внутри тарифа сами.</p>
      </div>
      <div style={{ border: '1px solid var(--stone)', padding: 32, position: 'sticky', top: 96 }} aria-live="polite">
        <div className="label" style={{ color: 'rgba(20,17,15,.65)', marginBottom: 16 }}>СУММА БАЛЛОВ</div>
        <div className="price-num" style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: .9 }}>{total}</div>
        <div style={{ margin: '24px 0 20px', height: 4, background: 'var(--stone)' }}><div style={{ height: '100%', background: 'var(--ink)', transformOrigin: 'left', transform: `scaleX(${Math.min(total / limit, 1)})`, transition: 'transform 400ms ease' }} /></div>
        {total === 0 && <p style={{ fontFamily: 'Playfair Display', fontSize: 24, lineHeight: 1.2 }}>Добавьте услуги, чтобы увидеть тариф</p>}
        {recommendation && <><p style={{ fontFamily: 'Playfair Display', fontSize: 28, lineHeight: 1.2 }}>Вам подходит «{recommendation.name}»</p><p style={{ fontSize: 16, marginTop: 8, color: 'rgba(20,17,15,.7)' }}>До {recommendation.points} баллов в месяц</p><button onClick={() => onChoose(recommendation.name)} style={buttonStyle}>Выбрать этот тариф</button></>}
        {total > 35 && <p style={{ fontFamily: 'Playfair Display', fontSize: 24, lineHeight: 1.25 }}>Это больше, чем входит в тариф «Про». Напишите нам, и мы подберём решение.</p>}
      </div>
    </div>
  );
}

const stepperStyle = { width: 32, height: 32, border: '1px solid var(--ink)', background: 'transparent', borderRadius: 2, fontSize: 20, lineHeight: 1 };
const buttonStyle = { marginTop: 24, padding: '16px 24px', border: 'none', background: 'var(--burgundy)', color: 'var(--paper)', borderRadius: 2, fontFamily: 'Inter', fontSize: 16, cursor: 'pointer' };
