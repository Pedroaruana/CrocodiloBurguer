import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import './ProductModal.css'

const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

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

export default function ProductModal({ product, onClose }) {
  const { dispatch } = useCart()
  const [qty, setQty] = useState(1)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function handleAdd() {
    for (let i = 0; i < qty; i++) dispatch({ type: 'ADD', product })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-hero" style={{ background: product.gradient }}>
          <span>{product.emoji}</span>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">✕</button>
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
            🛒 Adicionar · {fmt(product.price * qty)}
          </button>
        </div>
      </div>
    </div>
  )
}
