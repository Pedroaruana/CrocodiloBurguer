import { useState, useRef, useEffect } from 'react'
import { useBusinessHours } from '../hooks/useBusinessHours'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'
import './Header.css'

export default function Header({ restaurant, onLoginClick, onOrdersClick, onMinhaContaClick, onEnderecosClick, showToast }) {
  const isOpen = useBusinessHours()
  const { currentUser, logout } = useAuth()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)
  const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  useEffect(() => {
    function handleClick(e) {
      if (!menuRef.current?.contains(e.target)) setShowMenu(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleComingSoon(label) {
    setShowMenu(false)
    showToast?.(`${label} — em breve!`, 'info')
  }

  function handleLogout() {
    setShowMenu(false)
    logout()
  }

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

        {currentUser ? (
          <div className="header-user" ref={menuRef}>
            <button className="header-orders-btn" onClick={onOrdersClick} aria-label="Meus pedidos">
              <span>📦</span>
              <span>Pedidos</span>
            </button>

            <button
              className="header-avatar"
              onClick={() => setShowMenu(s => !s)}
              aria-label="Menu do usuário"
              aria-expanded={showMenu}
              aria-haspopup="menu"
              title={currentUser.name}
            >
              {currentUser.name.charAt(0).toUpperCase()}
            </button>

            {showMenu && (
              <div className="user-dropdown">
                <div className="user-dropdown-header">
                  <span className="user-dropdown-name">{currentUser.name.split(' ')[0]}</span>
                  <span className="user-dropdown-email">{currentUser.email}</span>
                </div>
                <div className="user-dropdown-divider" />
                <button className="user-dropdown-item" onClick={() => { setShowMenu(false); onMinhaContaClick?.() }}>
                  👤 Minha Conta
                </button>
                <button className="user-dropdown-item" onClick={() => { setShowMenu(false); onEnderecosClick?.() }}>
                  📍 Meus Endereços
                </button>
                <button className="user-dropdown-item" onClick={() => handleComingSoon('Cartões Salvos')}>
                  💳 Cartões Salvos
                </button>
                <button className="user-dropdown-item" onClick={() => handleComingSoon('Ajuda')}>
                  ❓ Ajuda
                </button>
                <div className="user-dropdown-divider" />
                <button className="user-dropdown-item logout" onClick={handleLogout}>
                  🚪 Sair
                </button>
              </div>
            )}
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
