import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const idx = state.items.findIndex(i => i.cartId === action.cartId)
      if (idx >= 0) {
        const items = [...state.items]
        items[idx] = { ...items[idx], quantity: items[idx].quantity + 1 }
        return { ...state, items }
      }
      return {
        ...state,
        items: [...state.items, {
          product:     action.product,
          extras:      action.extras || [],
          observation: action.observation || '',
          cartId:      action.cartId,
          quantity:    1,
        }],
      }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.cartId !== action.cartId) }
    case 'UPDATE_QTY': {
      if (action.quantity <= 0)
        return { ...state, items: state.items.filter(i => i.cartId !== action.cartId) }
      return {
        ...state,
        items: state.items.map(i =>
          i.cartId === action.cartId ? { ...i, quantity: action.quantity } : i
        ),
      }
    }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

const STORAGE_KEY = 'crocodilo-cart-v1'

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...JSON.parse(raw), isOpen: false }
  } catch {}
  return { items: [], isOpen: false }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, null, loadSaved)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }))
  }, [state.items])

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0)
  const subtotal   = state.items.reduce((s, i) => {
    const extrasPrice = (i.extras || []).reduce((e, x) => e + x.price, 0)
    return s + (i.product.price + extrasPrice) * i.quantity
  }, 0)

  return (
    <CartContext.Provider value={{ state, dispatch, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
