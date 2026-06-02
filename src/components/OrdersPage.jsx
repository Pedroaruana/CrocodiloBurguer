import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import './OrdersPage.css'

const fmt     = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const ORDERS_KEY = 'croco-orders-v1'

const STEPS = [
  { key: 'confirmado', label: 'Confirmado', emoji: '✅' },
  { key: 'preparando', label: 'Preparando', emoji: '👨‍🍳' },
  { key: 'a_caminho',  label: 'A caminho',  emoji: '🛵' },
  { key: 'entregue',   label: 'Entregue',   emoji: '🏠' },
]

function getStatus(createdAt) {
  const mins = (Date.now() - createdAt) / 60000
  if (mins < 3)  return STEPS[0]
  if (mins < 15) return STEPS[1]
  if (mins < 40) return STEPS[2]
  return STEPS[3]
}

function getEta(createdAt, statusKey) {
  const mins = (Date.now() - createdAt) / 60000
  if (statusKey === 'confirmado') return `Previsão: ~${Math.max(37, Math.round(40 - mins))} min`
  if (statusKey === 'preparando') return `Previsão: ~${Math.max(25, Math.round(40 - mins))} min`
  if (statusKey === 'a_caminho')  return `Chegando em ~${Math.max(5, Math.round(40 - mins))} min`
  return 'Pedido entregue!'
}

function formatDate(ts) {
  return new Date(ts).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export function saveOrder(order) {
  try {
    const existing = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]')
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...existing]))
  } catch {}
}

export function getOrders(userEmail) {
  try {
    const all = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]')
    return all.filter(o => o.userEmail === userEmail)
  } catch { return [] }
}

export default function OrdersPage({ onClose }) {
  const { currentUser } = useAuth()
  const [orders, setOrders] = useState([])
  const [, setTick] = useState(0)

  useEffect(() => {
    if (currentUser) setOrders(getOrders(currentUser.email))
  }, [currentUser])

  // Atualiza status E recarrega pedidos a cada 30s
  useEffect(() => {
    const id = setInterval(() => {
      setTick(t => t + 1)
      if (currentUser) setOrders(getOrders(currentUser.email))
    }, 30000)
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
              const status   = getStatus(order.createdAt)
              const stepIdx  = STEPS.findIndex(s => s.key === status.key)
              const eta      = getEta(order.createdAt, status.key)

              return (
                <div key={order.id} className="order-card">
                  {/* Cabeçalho */}
                  <div className="order-card-header">
                    <div>
                      <p className="order-id">Pedido #{order.id}</p>
                      <p className="order-date">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className={`order-status-badge ${status.key}`}>
                      <span className="order-status-dot" />
                      {status.emoji} {status.label}
                    </div>
                  </div>

                  {/* Stepper */}
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

                  {/* Itens */}
                  <div className="order-items">
                    {order.items.map(({ product, quantity }) => (
                      <div key={product.id} className="order-item-row">
                        <div className="order-item-thumb" style={{ background: product.gradient }}>
                          {product.emoji}
                        </div>
                        <span className="order-item-name">{product.name}</span>
                        <span className="order-item-qty">×{quantity}</span>
                        <span className="order-item-price">{fmt(product.price * quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
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
