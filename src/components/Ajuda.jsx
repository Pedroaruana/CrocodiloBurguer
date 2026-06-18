import { useState } from 'react'
import './Ajuda.css'

const FAQS = [
  { q: 'Quanto tempo demora a entrega?', a: 'O tempo médio de entrega é de 30 a 50 minutos, dependendo da sua localização e do movimento do restaurante.' },
  { q: 'Qual é o pedido mínimo?', a: 'O pedido mínimo é de R$ 25,00. A taxa de entrega é cobrada separadamente.' },
  { q: 'Como cancelo meu pedido?', a: 'Pedidos podem ser cancelados em até 5 minutos após a confirmação. Entre em contato pelo WhatsApp para cancelamentos.' },
  { q: 'O cardápio tem opções sem glúten?', a: 'Sim! Temos pães sem glúten disponíveis mediante pedido. Informe na observação do produto ao adicionar ao carrinho.' },
  { q: 'Posso pagar na entrega?', a: 'Aceitamos dinheiro e maquininha (débito e crédito) na entrega. Também temos pagamento via Pix.' },
  { q: 'Como uso um cupom de desconto?', a: 'No carrinho, antes de finalizar o pedido, há um campo para inserir seu cupom. Os cupons válidos são BEMVINDO10 e CROCO15.' },
  { q: 'Meu pedido chegou errado. O que faço?', a: 'Lamentamos! Entre em contato pelo WhatsApp em até 30 minutos após o recebimento com uma foto do pedido.' },
]

export default function Ajuda({ onClose }) {
  const [open, setOpen] = useState(null)

  function toggle(i) {
    setOpen(prev => prev === i ? null : i)
  }

  return (
    <div className="aj-overlay" onClick={onClose} aria-hidden="true">
      <div className="aj-sheet" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Ajuda">
        <div className="aj-header">
          <h2 className="aj-title">❓ Ajuda</h2>
          <button className="aj-close" onClick={onClose} aria-label="Fechar">✕</button>
        </div>

        <div className="aj-body">
          <p className="aj-subtitle">Perguntas frequentes</p>

          <div className="aj-faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className={`aj-faq-item ${open === i ? 'open' : ''}`}>
                <button className="aj-faq-question" onClick={() => toggle(i)} aria-expanded={open === i}>
                  <span>{faq.q}</span>
                  <span className="aj-faq-icon">{open === i ? '−' : '+'}</span>
                </button>
                {open === i && <p className="aj-faq-answer">{faq.a}</p>}
              </div>
            ))}
          </div>

          <div className="aj-contact">
            <p className="aj-contact-title">Ainda precisa de ajuda?</p>
            <a className="aj-whatsapp-btn" href="https://wa.me/5511999999999" target="_blank" rel="noreferrer">
              📲 Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
