import { useState, useEffect } from 'react'
import './CartoesSalvos.css'

const STORAGE_KEY = 'croco_cartoes'

const BANDEIRAS = {
  '4': { label: 'Visa', color: '#1a1f71', icon: '💳' },
  '5': { label: 'Mastercard', color: '#eb001b', icon: '💳' },
  '3': { label: 'Amex', color: '#007bc1', icon: '💳' },
  default: { label: 'Cartão', color: '#2d6a4f', icon: '💳' },
}

function getBandeira(num) {
  return BANDEIRAS[num?.[0]] ?? BANDEIRAS.default
}

function maskNumber(num) {
  const digits = num.replace(/\D/g, '')
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

function formatDisplay(num) {
  const digits = num.replace(/\D/g, '').slice(0, 16)
  const groups = digits.match(/.{1,4}/g) || []
  while (groups.length < 4) groups.push('')
  return groups.map((g, i) => i < 3 && g.length === 4 ? '●●●●' : g || '────').join(' ')
}

export default function CartoesSalvos({ onClose, showToast }) {
  const [cartoes, setCartoes] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] } catch { return [] }
  })
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ numero: '', nome: '', validade: '', cvv: '' })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartoes))
  }, [cartoes])

  function set(field, value) { setForm(f => ({ ...f, [field]: value })) }

  function handleNumero(val) {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    set('numero', maskNumber(digits))
  }

  function handleValidade(val) {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    const formatted = digits.length > 2 ? `${digits.slice(0,2)}/${digits.slice(2)}` : digits
    set('validade', formatted)
  }

  function handleSave(e) {
    e.preventDefault()
    const digits = form.numero.replace(/\D/g, '')
    if (digits.length < 16) { showToast?.('Número do cartão inválido.', 'error'); return }
    if (!form.nome.trim()) { showToast?.('Informe o nome do titular.', 'error'); return }
    if (form.validade.length < 5) { showToast?.('Validade inválida.', 'error'); return }
    setCartoes(prev => [...prev, { ...form, ultimos: digits.slice(-4), bandeira: getBandeira(digits).label }])
    showToast?.('Cartão salvo!', 'success')
    setForm({ numero: '', nome: '', validade: '', cvv: '' })
    setShowForm(false)
  }

  function handleRemove(i) {
    setCartoes(prev => prev.filter((_, idx) => idx !== i))
    showToast?.('Cartão removido.', 'info')
  }

  const bandeira = getBandeira(form.numero.replace(/\D/g, ''))

  return (
    <div className="cs-overlay" onClick={onClose} aria-hidden="true">
      <div className="cs-sheet" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Cartões Salvos">
        <div className="cs-header">
          <h2 className="cs-title">💳 Cartões Salvos</h2>
          <button className="cs-close" onClick={onClose} aria-label="Fechar">✕</button>
        </div>

        <div className="cs-body">
          {cartoes.length === 0 && !showForm && (
            <div className="cs-empty">
              <span>💳</span>
              <p>Nenhum cartão salvo</p>
              <small>Adicione um cartão para facilitar seus pedidos</small>
            </div>
          )}

          {cartoes.length > 0 && !showForm && (
            <div className="cs-list">
              {cartoes.map((c, i) => (
                <div key={i} className="cs-card" style={{ background: getBandeira(c.ultimos?.[0] === '4' ? '4' : c.bandeira === 'Mastercard' ? '5' : '3').color }}>
                  <div className="cs-card-top">
                    <span className="cs-card-bandeira">{c.bandeira}</span>
                    <button className="cs-card-remove" onClick={() => handleRemove(i)} aria-label="Remover cartão">✕</button>
                  </div>
                  <p className="cs-card-number">●●●● ●●●● ●●●● {c.ultimos}</p>
                  <div className="cs-card-bottom">
                    <span className="cs-card-nome">{c.nome.toUpperCase()}</span>
                    <span className="cs-card-validade">{c.validade}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!showForm && (
            <button className="cs-add-btn" onClick={() => setShowForm(true)}>+ Adicionar cartão</button>
          )}

          {showForm && (
            <form className="cs-form" onSubmit={handleSave}>
              <div className="cs-preview" style={{ background: bandeira.color }}>
                <span className="cs-preview-bandeira">{bandeira.label}</span>
                <p className="cs-preview-number">{formatDisplay(form.numero)}</p>
                <div className="cs-preview-bottom">
                  <span>{form.nome.toUpperCase() || 'NOME DO TITULAR'}</span>
                  <span>{form.validade || 'MM/AA'}</span>
                </div>
              </div>

              <label className="cs-label">
                Número do cartão
                <input className="cs-input" placeholder="0000 0000 0000 0000" value={form.numero} onChange={e => handleNumero(e.target.value)} maxLength={19} />
              </label>
              <label className="cs-label">
                Nome do titular
                <input className="cs-input" placeholder="Como no cartão" value={form.nome} onChange={e => set('nome', e.target.value)} maxLength={40} />
              </label>
              <div className="cs-row">
                <label className="cs-label" style={{ flex: 1 }}>
                  Validade
                  <input className="cs-input" placeholder="MM/AA" value={form.validade} onChange={e => handleValidade(e.target.value)} maxLength={5} />
                </label>
                <label className="cs-label" style={{ flex: 1 }}>
                  CVV
                  <input className="cs-input" placeholder="●●●" type="password" value={form.cvv} onChange={e => set('cvv', e.target.value.replace(/\D/g,'').slice(0,4))} maxLength={4} />
                </label>
              </div>
              <p className="cs-disclaimer">🔒 Seus dados são armazenados apenas neste dispositivo</p>
              <div className="cs-form-actions">
                <button type="button" className="cs-cancel-btn" onClick={() => { setShowForm(false); setForm({ numero: '', nome: '', validade: '', cvv: '' }) }}>Cancelar</button>
                <button type="submit" className="cs-save-btn">Salvar cartão</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
