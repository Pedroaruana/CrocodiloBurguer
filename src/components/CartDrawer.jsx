import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { restaurant } from '../data/menu'
import './Cart.css'

const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function CartDrawer({ onCheckout }) {
  const { state, dispatch, totalItems, subtotal } = useCart()
  const { isOpen, items } = state
  const total = subtotal + restaurant.deliveryFee

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  function close() { dispatch({ type: 'CLOSE_CART' }) }
  function updateQty(id, qty) { dispatch({ type: 'UPDATE_QTY', productId: id, quantity: qty }) }
  function clear() { dispatch({ type: 'CLEAR' }); close() }

  function handleCheckout() {
    close()
    onCheckout?.()
  }

  const belowMinOrder = subtotal < restaurant.minOrder

  return (
    <div className="cart-overlay" onClick={close}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">🛒 Meu Pedido</h2>
          <button className="cart-close" onClick={close} aria-label="Fechar">✕</button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <span>🐊</span>
              <p>Carrinho vazio!</p>
              <small>Adicione itens do cardápio</small>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div className="cart-item" key={product.id}>
                <div
                  className="cart-item-thumb"
                  style={{ background: product.gradient }}
                >
                  {product.emoji}
                </div>
                <div className="cart-item-info">
                  <p className="cart-item-name">{product.name}</p>
                  <p className="cart-item-price">{fmt(product.price * quantity)}</p>
                </div>
                <div className="cart-item-qty">
                  <button
                    className="cart-qty-btn"
                    onClick={() => updateQty(product.id, quantity - 1)}
                    aria-label="Diminuir"
                  >−</button>
                  <span className="cart-qty-val">{quantity}</span>
                  <button
                    className="cart-qty-btn"
                    onClick={() => updateQty(product.id, quantity + 1)}
                    aria-label="Aumentar"
                  >+</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-summary">
            <div className="cart-summary-row">
              <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'itens'})</span>
              <span>{fmt(subtotal)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Taxa de entrega</span>
              <span>{fmt(restaurant.deliveryFee)}</span>
            </div>
            <div className="cart-summary-row total">
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>

            <button
              className="cart-checkout-btn"
              onClick={handleCheckout}
              disabled={belowMinOrder}
              style={belowMinOrder ? { opacity: 0.5 } : {}}
            >
              ✅ Finalizar pedido
            </button>

            {belowMinOrder && (
              <p className="cart-min-order">
                Pedido mínimo: {fmt(restaurant.minOrder)} · faltam {fmt(restaurant.minOrder - subtotal)}
              </p>
            )}

            <button className="cart-clear-btn" onClick={clear}>
              Limpar carrinho
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
