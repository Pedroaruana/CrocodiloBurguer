import { useState } from 'react'

function detectBrand(num) {
  const n = num.replace(/\D/g, '')
  if (/^4/.test(n)) return 'visa'
  if (/^(5[1-5]|2[2-7])/.test(n)) return 'mastercard'
  if (/^3[47]/.test(n)) return 'amex'
  if (/^(636368|438935|504175|636297|636369)/.test(n)) return 'elo'
  if (/^606282/.test(n)) return 'hipercard'
  return null
}

function formatNumber(val, brand) {
  const n = val.replace(/\D/g, '')
  if (brand === 'amex') {
    const p1 = n.slice(0, 4)
    const p2 = n.slice(4, 10)
    const p3 = n.slice(10, 15)
    return [p1, p2, p3].filter(Boolean).join(' ')
  }
  return n.replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
}

function formatExpiry(val) {
  const n = val.replace(/\D/g, '').slice(0, 4)
  if (n.length > 2) return n.slice(0, 2) + '/' + n.slice(2)
  return n
}

const BRAND_LOGOS = {
  visa: (
    <svg viewBox="0 0 80 28" width="52" height="18">
      <rect width="80" height="28" rx="5" fill="#1a1f71"/>
      <text x="40" y="21" textAnchor="middle" fill="white" fontSize="18"
            fontWeight="bold" fontStyle="italic" fontFamily="Arial">VISA</text>
    </svg>
  ),
  mastercard: (
    <svg viewBox="0 0 54 36" width="40" height="26">
      <circle cx="19" cy="18" r="16" fill="#EB001B"/>
      <circle cx="35" cy="18" r="16" fill="#F79E1B"/>
      <path d="M27 5.3a16 16 0 010 25.4A16 16 0 0127 5.3z" fill="#FF5F00"/>
    </svg>
  ),
  amex: (
    <svg viewBox="0 0 80 28" width="52" height="18">
      <rect width="80" height="28" rx="5" fill="#007bc1"/>
      <text x="40" y="21" textAnchor="middle" fill="white" fontSize="14"
            fontWeight="bold" fontFamily="Arial" letterSpacing="2">AMEX</text>
    </svg>
  ),
  elo: (
    <svg viewBox="0 0 80 28" width="52" height="18">
      <rect width="80" height="28" rx="5" fill="#FFD700"/>
      <text x="40" y="21" textAnchor="middle" fill="#111" fontSize="17"
            fontWeight="900" fontFamily="Arial">elo</text>
    </svg>
  ),
  hipercard: (
    <svg viewBox="0 0 80 28" width="52" height="18">
      <rect width="80" height="28" rx="5" fill="#B3131B"/>
      <text x="40" y="20" textAnchor="middle" fill="white" fontSize="13"
            fontWeight="bold" fontFamily="Arial">hiper</text>
    </svg>
  ),
}

export default function CardFormSection({ type, onChange }) {
  const [number,  setNumber]  = useState('')
  const [name,    setName]    = useState('')
  const [expiry,  setExpiry]  = useState('')
  const [cvv,     setCvv]     = useState('')
  const [showCvv, setShowCvv] = useState(false)

  const brand   = detectBrand(number)
  const maxCvv  = brand === 'amex' ? 4 : 3
  const maxNum  = brand === 'amex' ? 17 : 19

  function handleNumber(e) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, brand === 'amex' ? 15 : 16)
    const b   = detectBrand(raw)
    const fmt = formatNumber(raw, b)
    setNumber(fmt)
    onChange({ number: raw, name, expiry, cvv, brand: b })
  }

  function handleExpiry(e) {
    const val = formatExpiry(e.target.value)
    setExpiry(val)
    onChange({ number: number.replace(/\D/g,''), name, expiry: val, cvv, brand })
  }

  function handleName(e) {
    const val = e.target.value.toUpperCase()
    setName(val)
    onChange({ number: number.replace(/\D/g,''), name: val, expiry, cvv, brand })
  }

  function handleCvv(e) {
    const val = e.target.value.replace(/\D/g,'').slice(0, maxCvv)
    setCvv(val)
    onChange({ number: number.replace(/\D/g,''), name, expiry, cvv: val, brand })
  }

  return (
    <div className="card-form">
      {/* Card preview strip */}
      <div className="card-preview" style={{
        background: brand
          ? brand === 'visa' ? 'linear-gradient(135deg,#1a1f71,#4257a4)'
          : brand === 'mastercard' ? 'linear-gradient(135deg,#333,#555)'
          : brand === 'amex' ? 'linear-gradient(135deg,#007bc1,#005a8e)'
          : brand === 'elo' ? 'linear-gradient(135deg,#222,#444)'
          : 'linear-gradient(135deg,#B3131B,#8b0000)'
          : 'linear-gradient(135deg,#2d6a4f,#1a472a)'
      }}>
        <div className="card-preview-top">
          <span className="card-chip">▣</span>
          <div className="card-brand-logo">
            {brand ? BRAND_LOGOS[brand] : <span className="card-no-brand">💳</span>}
          </div>
        </div>
        <p className="card-preview-number">
          {number || '•••• •••• •••• ••••'}
        </p>
        <div className="card-preview-bottom">
          <div>
            <span className="card-preview-label">TITULAR</span>
            <span className="card-preview-value">{name || 'SEU NOME'}</span>
          </div>
          <div>
            <span className="card-preview-label">VALIDADE</span>
            <span className="card-preview-value">{expiry || 'MM/AA'}</span>
          </div>
        </div>
      </div>

      <p className="card-type-label">
        {type === 'credit' ? '💳 Cartão de Crédito' : '🏧 Cartão de Débito'}
        {brand && <span className="card-brand-detected"> · {brand.charAt(0).toUpperCase() + brand.slice(1)} detectado!</span>}
      </p>

      {/* Número */}
      <div className="checkout-field" style={{ padding: '0 0 0 0', border: 'none' }}>
        <div className="card-input-row">
          <div style={{ flex: 1 }}>
            <label className="checkout-label" style={{ paddingTop: 0 }}>Número do cartão</label>
            <div style={{ position: 'relative' }}>
              <input
                className="checkout-input card-number-input"
                placeholder="0000 0000 0000 0000"
                value={number}
                onChange={handleNumber}
                inputMode="numeric"
                maxLength={maxNum}
              />
              {brand && (
                <div className="card-brand-inline">
                  {BRAND_LOGOS[brand]}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Nome */}
      <div className="checkout-field" style={{ padding: '0 0 0 0', border: 'none', marginTop: 12 }}>
        <label className="checkout-label" style={{ paddingTop: 0 }}>Nome no cartão</label>
        <input
          className="checkout-input"
          placeholder="COMO ESTÁ NO CARTÃO"
          value={name}
          onChange={handleName}
          style={{ textTransform: 'uppercase', letterSpacing: 1 }}
        />
      </div>

      {/* Validade + CVV */}
      <div className="card-row-two" style={{ marginTop: 12 }}>
        <div style={{ flex: 1 }}>
          <label className="checkout-label" style={{ paddingTop: 0 }}>Validade</label>
          <input
            className="checkout-input"
            placeholder="MM/AA"
            value={expiry}
            onChange={handleExpiry}
            inputMode="numeric"
            maxLength={5}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className="checkout-label" style={{ paddingTop: 0 }}>CVV</label>
          <div style={{ position: 'relative' }}>
            <input
              className="checkout-input"
              placeholder={'•'.repeat(maxCvv)}
              type={showCvv ? 'text' : 'password'}
              value={cvv}
              onChange={handleCvv}
              inputMode="numeric"
              maxLength={maxCvv}
            />
            <button
              type="button"
              className="auth-eye"
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}
              onClick={() => setShowCvv(s => !s)}
            >
              {showCvv ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
