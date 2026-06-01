import { useState, useEffect, useRef } from 'react'
import './PromoBanner.css'

const promos = [
  {
    id: 1,
    tag: '🔥 Mais pedido',
    title: 'Croco Smash',
    subtitle: 'Dois smash burgers + molho secreto da jaula',
    cta: 'Pedir agora',
    ctaColor: '#f4a261',
    gradient: 'linear-gradient(135deg, #0d2b1a 0%, #1a472a 50%, #3a7d5a 100%)',
    emoji: '🍔',
  },
  {
    id: 2,
    tag: '👨‍👩‍👧‍👦 Promoção',
    title: 'Combo Família',
    subtitle: '4 burgers + batata GG + 4 bebidas · só R$ 159,90',
    cta: 'Ver combo',
    ctaColor: '#52b788',
    gradient: 'linear-gradient(135deg, #0d2b1a 0%, #2d6a4f 60%, #40916c 100%)',
    emoji: '🎉',
  },
  {
    id: 3,
    tag: '🥛 Oferta especial',
    title: 'Milk Shake Grátis',
    subtitle: 'Peça 2 combos e ganhe um milk shake!',
    cta: 'Aproveitar',
    ctaColor: '#f9c74f',
    gradient: 'linear-gradient(135deg, #2d0a0a 0%, #6b2d2d 60%, #c1121f 100%)',
    emoji: '🥛',
  },
]

export default function PromoBanner() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  function go(idx) {
    setCurrent((idx + promos.length) % promos.length)
  }

  function resetTimer() {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % promos.length), 4000)
  }

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  function handleDot(idx) {
    go(idx)
    resetTimer()
  }

  return (
    <div className="promo-banner">
      <div
        className="promo-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {promos.map(p => (
          <div key={p.id} className="promo-slide" style={{ background: p.gradient }}>
            <div className="promo-content">
              <span className="promo-tag">{p.tag}</span>
              <h3 className="promo-title">{p.title}</h3>
              <p className="promo-subtitle">{p.subtitle}</p>
              <button
                className="promo-cta"
                style={{ color: p.ctaColor }}
              >
                {p.cta} →
              </button>
            </div>
            <span className="promo-emoji">{p.emoji}</span>
          </div>
        ))}
      </div>

      <div className="promo-dots">
        {promos.map((_, i) => (
          <button
            key={i}
            className={`promo-dot ${i === current ? 'active' : ''}`}
            onClick={() => handleDot(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
