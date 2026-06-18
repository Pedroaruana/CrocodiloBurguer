import { useState, useEffect } from 'react'
import './MeusEnderecos.css'

const STORAGE_KEY = 'croco_enderecos'

const EMPTY = { cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '' }

export default function MeusEnderecos({ onClose, showToast }) {
  const [enderecos, setEnderecos] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] } catch { return [] }
  })
  const [form, setForm] = useState(EMPTY)
  const [editIndex, setEditIndex] = useState(null)
  const [loadingCep, setLoadingCep] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enderecos))
  }, [enderecos])

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleCep(raw) {
    const cep = raw.replace(/\D/g, '')
    set('cep', raw)
    if (cep.length !== 8) return
    setLoadingCep(true)
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await res.json()
      if (!data.erro) {
        setForm(f => ({
          ...f,
          cep: raw,
          rua: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || '',
        }))
      }
    } catch {}
    setLoadingCep(false)
  }

  function handleSave(e) {
    e.preventDefault()
    if (!form.rua.trim() || !form.numero.trim()) {
      showToast?.('Preencha rua e número.', 'error')
      return
    }
    if (editIndex !== null) {
      setEnderecos(prev => prev.map((a, i) => i === editIndex ? form : a))
      showToast?.('Endereço atualizado!', 'success')
    } else {
      setEnderecos(prev => [...prev, form])
      showToast?.('Endereço salvo!', 'success')
    }
    setForm(EMPTY)
    setEditIndex(null)
    setShowForm(false)
  }

  function handleEdit(i) {
    setForm(enderecos[i])
    setEditIndex(i)
    setShowForm(true)
  }

  function handleDelete(i) {
    setEnderecos(prev => prev.filter((_, idx) => idx !== i))
    showToast?.('Endereço removido.', 'info')
  }

  function handleCancel() {
    setForm(EMPTY)
    setEditIndex(null)
    setShowForm(false)
  }

  return (
    <div className="me-overlay" onClick={onClose} aria-hidden="true">
      <div
        className="me-sheet"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Meus Endereços"
      >
        <div className="me-header">
          <h2 className="me-title">📍 Meus Endereços</h2>
          <button className="me-close" onClick={onClose} aria-label="Fechar">✕</button>
        </div>

        <div className="me-body">
          {enderecos.length === 0 && !showForm && (
            <div className="me-empty">
              <span>📍</span>
              <p>Nenhum endereço salvo</p>
              <small>Adicione um endereço de entrega</small>
            </div>
          )}

          {enderecos.length > 0 && !showForm && (
            <div className="me-list">
              {enderecos.map((end, i) => (
                <div key={i} className="me-card">
                  <div className="me-card-info">
                    <p className="me-card-rua">{end.rua}, {end.numero}{end.complemento ? ` — ${end.complemento}` : ''}</p>
                    <p className="me-card-sub">{end.bairro} · {end.cidade}/{end.estado}</p>
                    {end.cep && <p className="me-card-cep">CEP {end.cep}</p>}
                  </div>
                  <div className="me-card-actions">
                    <button className="me-card-btn edit" onClick={() => handleEdit(i)}>Editar</button>
                    <button className="me-card-btn remove" onClick={() => handleDelete(i)}>Remover</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!showForm && (
            <button className="me-add-btn" onClick={() => setShowForm(true)}>
              + Adicionar endereço
            </button>
          )}

          {showForm && (
            <form className="me-form" onSubmit={handleSave}>
              <h3 className="me-form-title">{editIndex !== null ? 'Editar endereço' : 'Novo endereço'}</h3>

              <label className="me-label">
                CEP {loadingCep && <span className="me-loading">buscando...</span>}
                <input
                  className="me-input"
                  placeholder="00000-000"
                  value={form.cep}
                  onChange={e => handleCep(e.target.value)}
                  maxLength={9}
                />
              </label>

              <label className="me-label">
                Rua / Avenida
                <input className="me-input" placeholder="Nome da rua" value={form.rua} onChange={e => set('rua', e.target.value)} />
              </label>

              <div className="me-row">
                <label className="me-label" style={{ flex: '0 0 100px' }}>
                  Número
                  <input className="me-input" placeholder="Ex: 123" value={form.numero} onChange={e => set('numero', e.target.value)} maxLength={10} />
                </label>
                <label className="me-label" style={{ flex: 1 }}>
                  Complemento
                  <input className="me-input" placeholder="Apto, bloco..." value={form.complemento} onChange={e => set('complemento', e.target.value)} />
                </label>
              </div>

              <label className="me-label">
                Bairro
                <input className="me-input" placeholder="Bairro" value={form.bairro} onChange={e => set('bairro', e.target.value)} />
              </label>

              <div className="me-row">
                <label className="me-label" style={{ flex: 1 }}>
                  Cidade
                  <input className="me-input" placeholder="Cidade" value={form.cidade} onChange={e => set('cidade', e.target.value)} />
                </label>
                <label className="me-label" style={{ flex: '0 0 80px' }}>
                  Estado
                  <input className="me-input" placeholder="UF" value={form.estado} onChange={e => set('estado', e.target.value)} maxLength={2} />
                </label>
              </div>

              <div className="me-form-actions">
                <button type="button" className="me-cancel-btn" onClick={handleCancel}>Cancelar</button>
                <button type="submit" className="me-save-btn">Salvar</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
