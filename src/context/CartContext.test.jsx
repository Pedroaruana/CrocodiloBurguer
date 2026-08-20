import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from './CartContext'

const product = { id: 'burguer-1', name: 'Croco Burguer', price: 25 }
const bacon = { id: 'bacon', label: 'Bacon', price: 5 }

function setup() {
  return renderHook(() => useCart(), { wrapper: CartProvider })
}

beforeEach(() => {
  localStorage.clear()
})

describe('CartContext', () => {
  it('inicia vazio', () => {
    const { result } = setup()
    expect(result.current.totalItems).toBe(0)
    expect(result.current.subtotal).toBe(0)
  })

  it('adiciona um item novo ao carrinho', () => {
    const { result } = setup()
    act(() => {
      result.current.dispatch({ type: 'ADD', product, cartId: 'burguer-1|' })
    })
    expect(result.current.totalItems).toBe(1)
    expect(result.current.subtotal).toBe(25)
  })

  it('incrementa a quantidade ao adicionar o mesmo item de novo', () => {
    const { result } = setup()
    act(() => {
      result.current.dispatch({ type: 'ADD', product, cartId: 'burguer-1|' })
      result.current.dispatch({ type: 'ADD', product, cartId: 'burguer-1|' })
    })
    expect(result.current.totalItems).toBe(2)
    expect(result.current.subtotal).toBe(50)
  })

  it('soma o preço dos adicionais no subtotal', () => {
    const { result } = setup()
    act(() => {
      result.current.dispatch({ type: 'ADD', product, extras: [bacon], cartId: 'burguer-1|bacon' })
    })
    expect(result.current.subtotal).toBe(30)
  })

  it('remove item quando a quantidade cai para 0', () => {
    const { result } = setup()
    act(() => {
      result.current.dispatch({ type: 'ADD', product, cartId: 'burguer-1|' })
      result.current.dispatch({ type: 'UPDATE_QTY', cartId: 'burguer-1|', quantity: 0 })
    })
    expect(result.current.totalItems).toBe(0)
  })

  it('aplica cupom de desconto válido', () => {
    const { result } = setup()
    act(() => {
      result.current.dispatch({ type: 'ADD', product, cartId: 'burguer-1|' })
      result.current.dispatch({ type: 'APPLY_COUPON', code: 'CROCO10' })
    })
    expect(result.current.discount).toBeCloseTo(2.5)
    expect(result.current.total).toBeCloseTo(22.5)
  })

  it('esvazia o carrinho e remove o cupom com CLEAR', () => {
    const { result } = setup()
    act(() => {
      result.current.dispatch({ type: 'ADD', product, cartId: 'burguer-1|' })
      result.current.dispatch({ type: 'APPLY_COUPON', code: 'CROCO10' })
      result.current.dispatch({ type: 'CLEAR' })
    })
    expect(result.current.totalItems).toBe(0)
    expect(result.current.couponInfo).toBeNull()
  })
})
