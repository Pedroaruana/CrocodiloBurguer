import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function Stars({ rating, reviewCount }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <span className="stars">
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(empty)}
      <span className="stars-count">{rating.toFixed(1)} ({reviewCount?.toLocaleString('pt-BR') ?? '—'})</span>
    </span>
  )
}

export default function ProductCard({ product, onClick }) {
  const { dispatch, state } = useCart()
  const [flash, setFlash] = useState(false)

  const qty = state.items
    .filter((i) => i.product.id === product.id)
    .reduce((sum, i) => sum + i.quantity, 0)

  function handleAdd(e) {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()

    window.dispatchEvent(
      new CustomEvent('cart-fly', {
        detail: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          emoji: product.emoji,
        },
      }),
    )

    dispatch({ type: 'ADD', product, cartId: String(product.id) })

    setFlash(true)
    setTimeout(() => setFlash(false), 300)
  }

  return (
    <div className="product-card" onClick={onClick} role="button" tabIndex={0}>
      <div className="product-card-body">
        {product.badge && (
          <span className="product-badge" style={{ background: product.badgeColor || '#2d6a4f' }}>
            {product.badge}
          </span>
        )}
        <p className="product-name">{product.name}</p>
        {product.rating && <Stars rating={product.rating} reviewCount={product.reviewCount} />}
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{fmt(product.price)}</span>
          <button
            className={`product-add-btn ${flash ? 'added' : ''}`}
            onClick={handleAdd}
            aria-label={`Adicionar ${product.name}`}
          >
            +
          </button>
        </div>
      </div>

      <div
        className="product-thumbnail"
        style={{ background: product.gradient }}
        aria-hidden="true"
      >
        <span className="product-thumb-emoji">{product.emoji}</span>
        {product.image && (
          <img
            src={product.image}
            alt=""
            className="product-thumb-img"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        )}
        {qty > 0 && <span className="product-thumbnail-qty">{qty}</span>}
      </div>
    </div>
  )
}
