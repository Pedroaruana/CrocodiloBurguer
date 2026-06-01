import { useCart } from '../context/CartContext'
import './Cart.css'

const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function CartBar() {
  const { totalItems, subtotal, dispatch } = useCart()

  if (totalItems === 0) return null

  return (
    <div className="cart-bar">
      <button
        className="cart-bar-btn"
        onClick={() => dispatch({ type: 'OPEN_CART' })}
        aria-label="Ver carrinho"
      >
        <span className="cart-bar-count">{totalItems}</span>
        <span className="cart-bar-label">🛒 Ver carrinho</span>
        <span className="cart-bar-total">{fmt(subtotal)}</span>
      </button>
    </div>
  )
}
