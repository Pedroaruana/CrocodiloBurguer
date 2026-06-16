import { useState, useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'
import './ProductModal.css'

const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const ADICIONAIS = [
  { id: 'bacon',   label: 'Bacon',               price: 5.00 },
  { id: 'cebola',  label: 'Cebola Caramelizada',  price: 4.00 },
  { id: 'salada',  label: 'Salada',               price: 2.00 },
  { id: 'carne',   label: 'Outra Carne 120g',     price: 9.00 },
]

const SAMPLE_REVIEWS = [
  { name: 'Lucas M.', avatar: '👨', rating: 5, comment: 'Melhor hamburguer da região! Molho secreto é incrível, voltarei com certeza.', date: 'há 2 dias' },
  { name: 'Ana P.',   avatar: '👩', rating: 5, comment: 'Chegou quente e crocante, entrega rápida. Super recomendo!', date: 'há 5 dias' },
  { name: 'Carlos S.',avatar: '🧑', rating: 4, comment: 'Muito bom! Pedi duas vezes essa semana. Só queria mais molho.', date: 'há 1 semana' },
]

function StarsFull({ rating }) {
  return (
    <span style={{ color: '#f9c74f', letterSpacing: 2 }}>
      {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
    </span>
  )
}

export default function ProductModal({ product, onClose, showToast }) {
  const { dispatch } = useCart()
  const [qty, setQty] = useState(1)
  const [selectedExtras, setSelectedExtras] = useState({})
  const [observation, setObservation] = useState('')
  const sheetRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    sheetRef.current?.querySelector('button')?.focus()
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return
      const focusable = sheetRef.current?.querySelectorAll(
        'button, input, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault()
        ;(e.shiftKey ? last : first).focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const chosenExtras = ADICIONAIS.filter(e => selectedExtras[e.id])
  const extrasTotal  = chosenExtras.reduce((s, e) => s + e.price, 0)
  const itemTotal    = (product.price + extrasTotal) * qty

  function toggleExtra(id) {
    setSelectedExtras(prev => ({ ...prev, [id]: !prev[id] }))
  }

  async function handleShare() {
    const text = `${product.emoji} ${product.name} — ${fmt(product.price)}\n${product.description}`
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text, url })
      } catch {}
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`)
      showToast?.('🔗 Link copiado!', 'info')
    }
  }

  function handleAdd() {
    const cartId = `${product.id}|${chosenExtras.map(e => e.id).sort().join(',')}`
    dispatch({
      type: 'ADD',
      product,
      extras: chosenExtras,
      observation: observation.trim(),
      cartId,
    })
    showToast?.(`${product.emoji} ${product.name} adicionado!`)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose} aria-hidden="true">
      <div
        className="modal-sheet"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        ref={sheetRef}
      >
        <div className="modal-hero" style={{ background: product.gradient }}>
          <span className="modal-hero-emoji">{product.emoji}</span>
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="modal-hero-img"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          )}
          <button className="modal-close" onClick={onClose} aria-label="Fechar">✕</button>
          <button className="modal-share" onClick={handleShare} aria-label="Compartilhar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {product.badge && (
            <span className="modal-badge" style={{ background: product.badgeColor || '#2d6a4f' }}>
              {product.badge}
            </span>
          )}
          <h2 className="modal-name">{product.name}</h2>
          {product.rating && (
            <div className="modal-rating">
              <StarsFull rating={product.rating} />
              <span className="modal-rating-text">
                {product.rating.toFixed(1)} · {product.reviewCount?.toLocaleString('pt-BR')} avaliações
              </span>
            </div>
          )}
          <p className="modal-description">{product.description}</p>
          <p className="modal-price">{fmt(product.price)}</p>

          {/* Reviews */}
          <div className="modal-reviews">
            <h4 className="modal-reviews-title">💬 Avaliações</h4>
            {SAMPLE_REVIEWS.map((r, i) => (
              <div key={i} className="modal-review">
                <div className="modal-review-header">
                  <span className="modal-review-avatar">{r.avatar}</span>
                  <div>
                    <p className="modal-review-name">{r.name}</p>
                    <StarsFull rating={r.rating} />
                  </div>
                  <span className="modal-review-date">{r.date}</span>
                </div>
                <p className="modal-review-comment">{r.comment}</p>
              </div>
            ))}
          </div>

          {/* Adicionais */}
          <div className="modal-adicionais">
            <h4 className="modal-section-title">➕ Adicionais</h4>
            {ADICIONAIS.map(extra => (
              <label key={extra.id} className="extra-item">
                <input
                  type="checkbox"
                  className="extra-checkbox"
                  checked={!!selectedExtras[extra.id]}
                  onChange={() => toggleExtra(extra.id)}
                />
                <span className="extra-label">{extra.label}</span>
                <span className="extra-price">+ {fmt(extra.price)}</span>
              </label>
            ))}
          </div>

          {/* Observações */}
          <div className="modal-observacoes">
            <h4 className="modal-section-title">📝 Observações</h4>
            <textarea
              className="obs-textarea"
              placeholder="Ex: sem cebola, molho à parte, ponto da carne..."
              value={observation}
              onChange={e => setObservation(e.target.value)}
              maxLength={200}
              rows={3}
            />
            <span className="obs-counter">{observation.length}/200</span>
          </div>
        </div>

        <div className="modal-footer">
          <div className="qty-control">
            <button
              className="qty-btn"
              onClick={() => setQty(q => Math.max(1, q - 1))}
              aria-label="Diminuir"
            >−</button>
            <span className="qty-value">{qty}</span>
            <button
              className="qty-btn"
              onClick={() => setQty(q => q + 1)}
              aria-label="Aumentar"
            >+</button>
          </div>

          <button className="modal-add-btn" onClick={handleAdd}>
            🛒 Adicionar · {fmt(itemTotal)}
          </button>
        </div>
      </div>
    </div>
  )
}
