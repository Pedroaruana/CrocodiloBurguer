import Logo from './Logo'
import './Header.css'

export default function Header({ restaurant }) {
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
          <div className={`header-status ${restaurant.isOpen ? 'open' : 'closed'}`}>
            <span className="header-status-dot" />
            {restaurant.isOpen ? `Aberto · ${restaurant.openHours}` : 'Fechado agora'}
          </div>
        </div>
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
