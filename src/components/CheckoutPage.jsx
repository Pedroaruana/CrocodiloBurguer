import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { saveOrder } from './OrdersPage'
import { restaurant } from '../data/menu'
import PixQRSection from './PixQRSection'
import CardFormSection from './CardFormSection'
import './CheckoutPage.css'

const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Algoritmo de Luhn — valida número de cartão
function luhn(num) {
  const n = num.replace(/\D/g, '')
  let sum = 0, alt = false
  for (let i = n.length - 1; i >= 0; i--) {
    let d = parseInt(n[i])
    if (alt) { d *= 2; if (d > 9) d -= 9 }
    sum += d; alt = !alt
  }
  return n.length >= 13 && sum % 10 === 0
}

// Valida MM/AA e rejeita datas passadas
function isValidExpiry(expiry) {
  const [mm, yy] = expiry.split('/')
  if (!mm || !yy || yy.length < 2) return false
  const month = parseInt(mm), year = parseInt('20' + yy)
  if (month < 1 || month > 12) return false
  const now = new Date()
  return new Date(year, month - 1, 1) >= new Date(now.getFullYear(), now.getMonth(), 1)
}

const PAYMENTS = [
  { id: 'pix',     label: 'PIX',        emoji: '⚡' },
  { id: 'credit',  label: 'Crédito',    emoji: '💳' },
  { id: 'debit',   label: 'Débito',     emoji: '🏧' },
  { id: 'cash',    label: 'Dinheiro',   emoji: '💵' },
]

export default function CheckoutPage({ onClose }) {
  const { state, dispatch, subtotal } = useCart()
  const { currentUser } = useAuth()
  const [payment, setPayment] = useState('pix')
  const [troco, setTroco]     = useState('')
  const [cardData, setCardData] = useState({})
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', cep: '',
    street: '', number: '', neighborhood: '', complement: '',
  })

  const total = subtotal + restaurant.deliveryFee

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function handleConfirm() {
    if (!form.name || !form.phone || !form.street || !form.number) {
      alert('Preencha seu nome, telefone, rua e número.')
      return
    }
    if (payment === 'credit' || payment === 'debit') {
      if (!cardData.number || !luhn(cardData.number))
        return alert('Número de cartão inválido.')
      if (!cardData.name?.trim())
        return alert('Informe o nome do titular.')
      if (!cardData.expiry || !isValidExpiry(cardData.expiry))
        return alert('Data de validade inválida ou expirada.')
      if (!cardData.cvv || cardData.cvv.length < 3)
        return alert('CVV inválido.')
    }
    const order = {
      id: crypto.randomUUID(),
      userEmail: currentUser?.email ?? 'guest',
      items: state.items,
      total,
      address: form,
      payment,
      createdAt: Date.now(),
    }
    saveOrder(order)
    setSuccess(true)
    dispatch({ type: 'CLEAR' })
  }

  if (success) {
    return (
      <div className="checkout-overlay">
        <div className="checkout-page">
          <div className="checkout-header">
            <span style={{ fontSize: 18, fontWeight: 800 }}>🐊 Crocodilo Burguer</span>
          </div>
          <div className="checkout-success">
            <span className="checkout-success-icon">✅</span>
            <h2>Pedido confirmado!</h2>
            <p>Sua mordida está saindo do forno. Aguarde o entregador bater na sua porta!</p>
            <div className="checkout-success-info">
              <div className="checkout-success-info-row">
                <span>Tempo estimado</span>
                <span>🕐 {restaurant.deliveryTime} min</span>
              </div>
              <div className="checkout-success-info-row">
                <span>Total pago</span>
                <span>{fmt(total)}</span>
              </div>
              <div className="checkout-success-info-row">
                <span>Pagamento</span>
                <span>{PAYMENTS.find(p => p.id === payment)?.emoji} {PAYMENTS.find(p => p.id === payment)?.label}</span>
              </div>
            </div>
            <button className="checkout-success-btn" onClick={onClose}>
              Voltar ao cardápio
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-overlay">
      <div className="checkout-page">
        <div className="checkout-header">
          <button className="checkout-back" onClick={onClose} aria-label="Voltar">←</button>
          <span className="checkout-header-title">Finalizar Pedido</span>
        </div>

        <div className="checkout-body">
          {/* Resumo */}
          <div className="checkout-card">
            <p className="checkout-card-title">Resumo do pedido</p>
            {state.items.map(({ product, quantity }) => (
              <div className="checkout-order-item" key={product.id}>
                <div className="checkout-item-thumb" style={{ background: product.gradient }}>
                  <span className="thumb-emoji">{product.emoji}</span>
                  {product.image && (
                    <img src={product.image} alt="" className="thumb-img" loading="lazy"
                         onError={(e) => { e.currentTarget.style.display = 'none' }} />
                  )}
                </div>
                <span className="checkout-item-name">{product.name}</span>
                <span className="checkout-item-qty">×{quantity}</span>
                <span className="checkout-item-price">{fmt(product.price * quantity)}</span>
              </div>
            ))}
          </div>

          {/* Entrega */}
          <div className="checkout-card">
            <p className="checkout-card-title">Dados de entrega</p>

            <div className="checkout-field">
              <label className="checkout-label">Nome completo *</label>
              <input className="checkout-input" placeholder="Seu nome" value={form.name}
                onChange={e => set('name', e.target.value)} />
            </div>

            <div className="checkout-field">
              <label className="checkout-label">Telefone / WhatsApp *</label>
              <input className="checkout-input" placeholder="(11) 99999-9999" value={form.phone}
                onChange={e => set('phone', e.target.value)} inputMode="tel" />
            </div>

            <div className="checkout-row">
              <div className="checkout-field">
                <label className="checkout-label">CEP</label>
                <input className="checkout-input" placeholder="00000-000" value={form.cep}
                  onChange={e => set('cep', e.target.value)} inputMode="numeric" />
              </div>
              <div className="checkout-field">
                <label className="checkout-label">Bairro</label>
                <input className="checkout-input" placeholder="Seu bairro" value={form.neighborhood}
                  onChange={e => set('neighborhood', e.target.value)} />
              </div>
            </div>

            <div className="checkout-row">
              <div className="checkout-field" style={{ flex: 2 }}>
                <label className="checkout-label">Rua / Av. *</label>
                <input className="checkout-input" placeholder="Nome da rua" value={form.street}
                  onChange={e => set('street', e.target.value)} />
              </div>
              <div className="checkout-field" style={{ flex: 1 }}>
                <label className="checkout-label">Número *</label>
                <input className="checkout-input" placeholder="42" value={form.number}
                  onChange={e => set('number', e.target.value)} inputMode="numeric" />
              </div>
            </div>

            <div className="checkout-field">
              <label className="checkout-label">Complemento</label>
              <input className="checkout-input" placeholder="Apto, bloco, referência…" value={form.complement}
                onChange={e => set('complement', e.target.value)} />
            </div>
          </div>

          {/* Pagamento */}
          <div className="checkout-card">
            <p className="checkout-card-title">Forma de pagamento</p>
            <div className="payment-options">
              {PAYMENTS.map(p => (
                <button
                  key={p.id}
                  className={`payment-option ${payment === p.id ? 'selected' : ''}`}
                  onClick={() => setPayment(p.id)}
                >
                  <span className="payment-option-emoji">{p.emoji}</span>
                  <span className="payment-option-label">{p.label}</span>
                </button>
              ))}
            </div>
            {payment === 'cash' && (
              <div className="troco-field">
                <p className="troco-label">Troco para quanto?</p>
                <input
                  className="troco-input"
                  placeholder="Ex: R$ 100,00"
                  value={troco}
                  onChange={e => setTroco(e.target.value)}
                  inputMode="numeric"
                />
              </div>
            )}

            {payment === 'pix' && (
              <PixQRSection total={total} onConfirm={handleConfirm} />
            )}

            {(payment === 'credit' || payment === 'debit') && (
              <CardFormSection type={payment} onChange={setCardData} />
            )}
          </div>
        </div>

        <div className="checkout-footer">
          <div className="checkout-total-row">
            <span>Subtotal</span><span>{fmt(subtotal)}</span>
          </div>
          <div className="checkout-total-row">
            <span>Taxa de entrega</span><span>{fmt(restaurant.deliveryFee)}</span>
          </div>
          <div className="checkout-total-row grand">
            <span>Total</span><span>{fmt(total)}</span>
          </div>
          {payment !== 'pix' && (
            <button className="checkout-confirm-btn" onClick={handleConfirm}>
              {payment === 'credit' ? '💳 Confirmar pagamento'
               : payment === 'debit' ? '🏧 Confirmar pagamento'
               : '✅ Confirmar pedido'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
