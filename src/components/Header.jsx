import { useBusinessHours } from '../hooks/useBusinessHours'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'
import './Header.css'

export default function Header({ restaurant, onLoginClick, onOrdersClick }) {
  const isOpen = useBusinessHours()
  const { currentUser, logout } = useAuth()
  const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-logo">
          <Logo size={64} />
        </div>
        <div className="header-info">
          <h1 className="header-name">
            Crocodilo <span>Burguer</span>
          </h1>
          <p className="header-tagline">🐊 {restaurant.tagline}</p>
          <div className={`header-status ${isOpen ? 'open' : 'closed'}`}>
            <span className="header-status-dot" />
            {isOpen ? `Aberto · ${restaurant.openHours}` : `Fechado · abre às 11h`}
          </div>
        </div>

        {/* Login / User button */}
        {currentUser ? (
          <div className="header-user">
            <button className="header-orders-btn" onClick={onOrdersClick} aria-label="Meus pedidos">
              <span>📦</span>
              <span>Pedidos</span>
            </button>
            <div className="header-avatar" title={currentUser.name}>
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="header-user-info">
              <span className="header-user-name">{currentUser.name.split(' ')[0]}</span>
              <button className="header-logout" onClick={logout}>Sair</button>
            </div>
          </div>
        ) : (
          <button className="header-login-btn" onClick={onLoginClick}>
            <span>👤</span>
            <span>Entrar</span>
          </button>
        )}
      </div>

      <div className="header-divider" />

      <div className="header-stats">
        <div className="header-stat">
          <span className="stat-value yellow">⭐ {restaurant.rating}</span>
          <span className="stat-label">{restaurant.reviewCount.toLocaleString('pt-BR')} avaliações</span>
        </div>
        <div className="header-stat">
          <span className="stat-value">🕐 {restaurant.deliveryTime}'</span>
          <span className="stat-label">Tempo entrega</span>
        </div>
        <div className="header-stat">
          <span className="stat-value">{fmt(restaurant.deliveryFee)}</span>
          <span className="stat-label">Taxa de entrega</span>
        </div>
        <div className="header-stat">
          <span className="stat-value">{fmt(restaurant.minOrder)}</span>
          <span className="stat-label">Pedido mínimo</span>
        </div>
      </div>

      <div className="header-address">
        📍 {restaurant.address}
      </div>
    </header>
  )
}
