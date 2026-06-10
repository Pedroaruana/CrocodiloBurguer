import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import './OrdersPage.css'

const REFRESH_MS = 30_000

const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const STEPS = [
  { key: 'confirmado', label: 'Confirmado', emoji: '✅' },
  { key: 'preparando', label: 'Preparando', emoji: '👨‍🍳' },
  { key: 'a_caminho', label: 'A caminho', emoji: '🛵' },
  { key: 'entregue', label: 'Entregue', emoji: '🏠' },
]

function getStatus(createdAt) {
  const mins = (Date.now() - new Date(createdAt).getTime()) / 60000
  if (mins < 3) return STEPS[0]
  if (mins < 15) return STEPS[1]
  if (mins < 40) return STEPS[2]
  return STEPS[3]
}

function getEta(createdAt, statusKey) {
  const mins = (Date.now() - new Date(createdAt).getTime()) / 60000
  if (statusKey === 'confirmado') return `Previsão: ~${Math.max(37, Math.round(40 - mins))} min`
  if (statusKey === 'preparando') return `Previsão: ~${Math.max(25, Math.round(40 - mins))} min`
  if (statusKey === 'a_caminho') return `Chegando em ~${Math.max(5, Math.round(40 - mins))} min`
  return 'Pedido entregue!'
}

function formatDate(ts) {
  return new Date(ts).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export async function saveOrder(order) {
  const { error } = await supabase.from('orders').insert({
    user_email: order.userEmail,
    items: order.items,
    total: order.total,
    address: order.address,
    payment: order.payment,
  })
  if (error) console.error('Erro ao salvar pedido:', error)
}

export default function OrdersPage({ onClose }) {
  const { currentUser } = useAuth()
  const [orders, setOrders] = useState([])
  const [, forceTick] = useState(0)

  async function fetchOrders() {
    if (!currentUser) return
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_email', currentUser.email)
      .order('created_at', { ascending: false })
    if (!error && data) setOrders(data)
  }

  useEffect(() => {
    fetchOrders()

    const id = setInterval(() => {
      fetchOrders()
      forceTick((t) => t + 1)
    }, REFRESH_MS)

    return () => clearInterval(id)
  }, [currentUser])

  return (
    <div className="orders-overlay">
      <div className="orders-page">
        <div className="orders-header">
          <button className="orders-back" onClick={onClose} aria-label="Voltar">←</button>
          <div className="orders-header-text">
            <p className="orders-header-title">📦 Meus Pedidos</p>
            <p className="orders-header-sub">Olá, {currentUser?.name.split(' ')[0]}! Aqui estão seus pedidos.</p>
          </div>
        </div>

        <div className="orders-body">
          {orders.length === 0 ? (
            <div className="orders-empty">
              <span className="orders-empty-icon">🛵</span>
              <h3>Nenhum pedido ainda</h3>
              <p>Faça seu primeiro pedido e acompanhe o status aqui em tempo real!</p>
              <button className="orders-empty-btn" onClick={onClose}>
                Ver cardápio
              </button>
            </div>
          ) : (
            orders.map(order => {
              const status  = getStatus(order.created_at)
              const stepIdx = STEPS.findIndex(s => s.key === status.key)
              const eta     = getEta(order.created_at, status.key)

              return (
                <div key={order.id} className="order-card">
                  <div className="order-card-header">
                    <div>
                      <p className="order-id">Pedido #{order.id.slice(0, 8)}</p>
                      <p className="order-date">{formatDate(order.created_at)}</p>
                    </div>
                    <div className={`order-status-badge ${status.key}`}>
                      <span className="order-status-dot" />
                      {status.emoji} {status.label}
                    </div>
                  </div>

                  <div className="order-stepper">
                    {STEPS.map((step, i) => (
                      <div
                        key={step.key}
                        className={`order-step ${i < stepIdx ? 'done' : i === stepIdx ? 'active' : ''}`}
                      >
                        <div className="order-step-circle">
                          {i < stepIdx ? '✓' : step.emoji}
                        </div>
                        <span className="order-step-label">{step.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-items">
                    {order.items.map(({ product, quantity }) => (
                      <div key={product.id} className="order-item-row">
                        <div className="order-item-thumb" style={{ background: product.gradient }}>
                          <span className="thumb-emoji">{product.emoji}</span>
                          {product.image && (
                            <img src={product.image} alt="" className="thumb-img" loading="lazy"
                                 onError={(e) => { e.currentTarget.style.display = 'none' }} />
                          )}
                        </div>
                        <span className="order-item-name">{product.name}</span>
                        <span className="order-item-qty">×{quantity}</span>
                        <span className="order-item-price">{fmt(product.price * quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-card-footer">
                    <div>
                      <p className="order-total-label">Total pago</p>
                      <p className="order-total-value">{fmt(order.total)}</p>
                    </div>
                    <span className="order-eta">🕐 {eta}</span>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
