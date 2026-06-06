import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { restaurant } from '../data/menu'
import './Cart.css'

const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function CartDrawer({ onCheckout, showToast }) {
  const { state, dispatch, totalItems, subtotal, discount, total: cartTotal, couponInfo } = useCart()
  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')
  const { isOpen, items } = state
  const total = cartTotal + restaurant.deliveryFee

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  function close() { dispatch({ type: 'CLOSE_CART' }) }
  function updateQty(cartId, qty) { dispatch({ type: 'UPDATE_QTY', cartId, quantity: qty }) }
  function clear() { dispatch({ type: 'CLEAR' }); close() }

  function handleCheckout() {
    close()
    onCheckout?.()
  }

  const belowMinOrder = subtotal < restaurant.minOrder

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase()
    if (!code) return
    if (code !== 'CROCO10' && code !== 'CROCO20') {
      setCouponError('Cupom inválido')
      showToast?.('Cupom inválido ou expirado', 'error')
      return
    }
    dispatch({ type: 'APPLY_COUPON', code })
    setCouponInput('')
    setCouponError('')
    showToast?.('🎟️ Cupom aplicado com sucesso!')
  }

  function removeCoupon() {
    dispatch({ type: 'REMOVE_COUPON' })
    showToast?.('Cupom removido', 'info')
  }

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
            items.map(({ product, quantity, extras, observation, cartId }) => {
              const extrasPrice = (extras || []).reduce((s, e) => s + e.price, 0)
              return (
                <div className="cart-item" key={cartId}>
                  <div
                    className="cart-item-thumb"
                    style={{ background: product.gradient }}
                  >
                    <span className="cart-item-thumb-emoji">{product.emoji}</span>
                    {product.image && (
                      <img
                        src={product.image}
                        alt=""
                        className="cart-item-thumb-img"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                    )}
                  </div>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{product.name}</p>
                    {extras?.length > 0 && (
                      <p className="cart-item-extras">
                        + {extras.map(e => e.label).join(', ')}
                      </p>
                    )}
                    {observation && (
                      <p className="cart-item-obs">📝 {observation}</p>
                    )}
                    <p className="cart-item-price">{fmt((product.price + extrasPrice) * quantity)}</p>
                  </div>
                  <div className="cart-item-qty">
                    <button
                      className="cart-qty-btn"
                      onClick={() => updateQty(cartId, quantity - 1)}
                      aria-label="Diminuir"
                    >−</button>
                    <span className="cart-qty-val">{quantity}</span>
                    <button
                      className="cart-qty-btn"
                      onClick={() => updateQty(cartId, quantity + 1)}
                      aria-label="Aumentar"
                    >+</button>
                  </div>
                </div>
              )
            })
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
            {discount > 0 && (
              <div className="cart-summary-row" style={{ color: '#2d6a4f' }}>
                <span>Desconto ({couponInfo.label})</span>
                <span>−{fmt(discount)}</span>
              </div>
            )}
            <div className="cart-summary-row total">
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>

            {state.coupon ? (
              <div className="cart-coupon-applied">
                <span>🎟️ Cupom <strong>{state.coupon}</strong> aplicado!</span>
                <button onClick={removeCoupon} className="cart-coupon-remove">Remover</button>
              </div>
            ) : (
              <div className="cart-coupon-box">
                <input
                  type="text"
                  className="cart-coupon-input"
                  placeholder="Tem cupom? Digite aqui"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value)
                    setCouponError('')
                  }}
                />
                <button onClick={applyCoupon} className="cart-coupon-btn">Aplicar</button>
              </div>
            )}
            {couponError && <p className="cart-coupon-error">{couponError}</p>}

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
