import { useState } from 'react'
import './LegalBanner.css'

const TICKER_TEXT =
  '🐊 Carne de jacaré autorizada pelo IBAMA · Criadouro certificado pelo MAPA · Produto inspecionado pelo SIF · 100% rastreável · Espécie: Caiman crocodilus yacare · Sem risco de extinção · ' +
  '🐊 Carne de jacaré autorizada pelo IBAMA · Criadouro certificado pelo MAPA · Produto inspecionado pelo SIF · 100% rastreável · Espécie: Caiman crocodilus yacare · Sem risco de extinção · '

export default function LegalBanner() {
  const [visible, setVisible]   = useState(true)
  const [expanded, setExpanded] = useState(false)

  if (!visible) return null

  return (
    <div className="legal-banner">
      {/* Faixa rolante */}
      <div className="legal-ticker-wrap">
        <span className="legal-ticker">{TICKER_TEXT}</span>
      </div>

      <div className="legal-main">
        {/* Selo animado */}
        <div className="legal-seal">
          <span className="legal-seal-ring" />
          <span className="legal-seal-ring" />
          <span className="legal-seal-icon">🛡️</span>
        </div>

        <div className="legal-content">
          <p className="legal-title">🐊 Carnes Exóticas — 100% Regularizadas</p>
          <p className="legal-subtitle">
            Nossa carne de jacaré é comercialmente permitida no Brasil, proveniente de
            criadouro autorizado pelo <strong>IBAMA</strong>, com certificação sanitária
            do <strong>MAPA</strong> e inspeção federal (SIF).
          </p>

          <div className="legal-badges">
            <span className="legal-badge">✅ IBAMA Autorizado</span>
            <span className="legal-badge">🏛️ MAPA Certificado</span>
            <span className="legal-badge">🔬 SIF Inspecionado</span>
            <span className="legal-badge">♻️ Criação Sustentável</span>
          </div>

          <button className="legal-expand-btn" onClick={() => setExpanded(e => !e)}>
            {expanded ? '▲ Ver menos' : '▼ Saiba mais'}
          </button>

          {expanded && (
            <div className="legal-detail">
              <p>
                A espécie utilizada é o <strong>Caiman crocodilus yacare</strong> (Yacaré-do-Pantanal),
                criado em fazendas com licença ambiental vigente, conforme a{' '}
                <strong>Portaria IBAMA nº 102/1998</strong> e a{' '}
                <strong>IN MAPA nº 28/2012</strong>.
              </p>
              <br />
              <p>
                O abate é realizado em frigoríficos com Serviço de Inspeção Federal (SIF),
                garantindo a rastreabilidade completa do produto — do criadouro até o prato.
                A carne de jacaré é rica em proteínas, baixa em gordura e considerada
                uma alternativa sustentável à pecuária convencional.
              </p>
              <br />
              <p style={{ color: '#95d5b2', fontWeight: 600 }}>
                🌿 Consumir carne de criadouro legal contribui para a preservação
                da espécie no habitat natural.
              </p>
            </div>
          )}
        </div>
      </div>

      <button className="legal-close" onClick={() => setVisible(false)} aria-label="Fechar aviso">
        ✕
      </button>
    </div>
  )
}
