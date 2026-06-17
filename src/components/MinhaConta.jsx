import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './MinhaConta.css'

export default function MinhaConta({ onClose, showToast }) {
  const { currentUser, updateName, updatePassword } = useAuth()
  const [name, setName] = useState(currentUser?.name ?? '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loadingName, setLoadingName] = useState(false)
  const [loadingPass, setLoadingPass] = useState(false)

  async function handleSaveName(e) {
    e.preventDefault()
    if (!name.trim()) return
    setLoadingName(true)
    const res = await updateName(name.trim())
    setLoadingName(false)
    if (res.error) showToast?.(res.error, 'error')
    else showToast?.('Nome atualizado!', 'success')
  }

  async function handleSavePassword(e) {
    e.preventDefault()
    if (password.length < 6) { showToast?.('Senha deve ter ao menos 6 caracteres.', 'error'); return }
    if (password !== confirmPassword) { showToast?.('As senhas não coincidem.', 'error'); return }
    setLoadingPass(true)
    const res = await updatePassword(password)
    setLoadingPass(false)
    if (res.error) showToast?.(res.error, 'error')
    else { showToast?.('Senha alterada com sucesso!', 'success'); setPassword(''); setConfirmPassword('') }
  }

  return (
    <div className="mc-overlay" onClick={onClose} aria-hidden="true">
      <div
        className="mc-sheet"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Minha Conta"
      >
        <div className="mc-header">
          <div className="mc-avatar">{currentUser?.name?.charAt(0).toUpperCase()}</div>
          <div>
            <p className="mc-header-name">{currentUser?.name}</p>
            <p className="mc-header-email">{currentUser?.email}</p>
          </div>
          <button className="mc-close" onClick={onClose} aria-label="Fechar">✕</button>
        </div>

        <div className="mc-body">
          <form className="mc-section" onSubmit={handleSaveName}>
            <h3 className="mc-section-title">👤 Dados pessoais</h3>
            <label className="mc-label">
              Nome
              <input
                className="mc-input"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={60}
                placeholder="Seu nome"
              />
            </label>
            <label className="mc-label">
              E-mail
              <input className="mc-input" value={currentUser?.email ?? ''} disabled />
            </label>
            <button className="mc-btn" type="submit" disabled={loadingName}>
              {loadingName ? 'Salvando...' : 'Salvar nome'}
            </button>
          </form>

          <form className="mc-section" onSubmit={handleSavePassword}>
            <h3 className="mc-section-title">🔒 Alterar senha</h3>
            <label className="mc-label">
              Nova senha
              <input
                className="mc-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
              />
            </label>
            <label className="mc-label">
              Confirmar senha
              <input
                className="mc-input"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repita a nova senha"
              />
            </label>
            <button className="mc-btn" type="submit" disabled={loadingPass}>
              {loadingPass ? 'Salvando...' : 'Alterar senha'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
