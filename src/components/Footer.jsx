import { restaurant } from '../data/menu'
import './Footer.css'

export default function Footer({ onOrdersClick, onLoginClick }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-body">
        <div className="footer-col">
          <span className="footer-logo">🐊</span>
          <h3 className="footer-brand">Crocodilo Burguer</h3>
          <p className="footer-info">📍 {restaurant.address}</p>
          <p className="footer-info">📞 {restaurant.phone}</p>
          <p className="footer-info">🕐 Seg–Dom · {restaurant.openHours}</p>
          <div className="footer-rating">
            <span className="footer-stars">⭐ {restaurant.rating}</span>
            <span className="footer-reviews">{restaurant.reviewCount.toLocaleString('pt-BR')} avaliações</span>
          </div>
        </div>

        <div className="footer-col footer-col--links">
          <h4 className="footer-col-title">Links úteis</h4>
          <button className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Cardápio
          </button>
          <button className="footer-link" onClick={onOrdersClick}>
            Meus Pedidos
          </button>
          <button className="footer-link" onClick={onLoginClick}>
            Entrar / Cadastrar
          </button>
          <a
            className="footer-link"
            href="https://github.com/Pedroaruana/CrocodiloBurguer"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub do projeto
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Crocodilo Burguer · Feito por <strong>Pedro Aruanã</strong></p>
        <p className="footer-disclaimer">Projeto fictício para fins de portfólio</p>
      </div>
    </footer>
  )
}
