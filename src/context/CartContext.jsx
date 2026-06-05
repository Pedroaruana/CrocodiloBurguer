import { createContext, useContext, useEffect, useReducer } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'crocodilo-cart-v2'
const STORAGE_KEY_OLD = 'crocodilo-cart-v1'

const COUPONS = {
  CROCO10: { discount: 0.10, label: '10% OFF' },
  CROCO20: { discount: 0.20, label: '20% OFF' },
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const idx = state.items.findIndex((i) => i.cartId === action.cartId)
      if (idx >= 0) {
        const items = [...state.items]
        items[idx] = { ...items[idx], quantity: items[idx].quantity + 1 }
        return { ...state, items }
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            product: action.product,
            extras: action.extras || [],
            observation: action.observation || '',
            cartId: action.cartId,
            quantity: 1,
          },
        ],
      }
    }
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter((i) => i.cartId !== action.cartId),
      }
    case 'UPDATE_QTY':
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.cartId !== action.cartId),
        }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartId === action.cartId ? { ...i, quantity: action.quantity } : i,
        ),
      }
    case 'APPLY_COUPON':
      return { ...state, coupon: action.code }
    case 'REMOVE_COUPON':
      return { ...state, coupon: null }
    case 'CLEAR':
      return { ...state, items: [], coupon: null }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

function loadSaved() {
  try {
    localStorage.removeItem(STORAGE_KEY_OLD)
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      const items = (parsed.items || []).filter((i) => i.cartId && i.product)
      return { items, isOpen: false, coupon: parsed.coupon ?? null }
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }
  return { items: [], isOpen: false, coupon: null }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, null, loadSaved)

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ items: state.items, coupon: state.coupon }),
    )
  }, [state.items, state.coupon])

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0)
  const subtotal = state.items.reduce((s, i) => {
    const extrasPrice = (i.extras || []).reduce((acc, x) => acc + x.price, 0)
    return s + (i.product.price + extrasPrice) * i.quantity
  }, 0)

  const couponInfo = state.coupon ? COUPONS[state.coupon] : null
  const discount = couponInfo ? subtotal * couponInfo.discount : 0
  const total = subtotal - discount

  return (
    <CartContext.Provider
      value={{ state, dispatch, totalItems, subtotal, discount, total, couponInfo }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
