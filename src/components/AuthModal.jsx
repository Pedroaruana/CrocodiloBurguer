import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import './AuthModal.css'

export default function AuthModal({ initialTab = 'login', onClose }) {
  const { login, register } = useAuth()
  const [tab, setTab]         = useState(initialTab)
  const [showPass, setShowPass] = useState(false)
  const [error, setError]     = useState('')
  const [form, setForm]       = useState({ name: '', email: '', password: '' })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setError('')
  }

  function switchTab(t) {
    setTab(t)
    setError('')
    setForm({ name: '', email: '', password: '' })
  }

  function validate() {
    if (tab === 'register' && !form.name.trim())
      return 'Informe seu nome.'
    if (!form.email.includes('@'))
      return 'E-mail inválido.'
    if (form.password.length < 6)
      return 'Senha deve ter ao menos 6 caracteres.'
    return null
  }

  function handleSubmit(e) {
    e.preventDefault()
    const err = validate()
    if (err) return setError(err)

    const result = tab === 'login'
      ? login({ email: form.email, password: form.password })
      : register({ name: form.name, email: form.email, password: form.password })

    if (result.error) return setError(result.error)
    onClose()
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-sheet" onClick={e => e.stopPropagation()}>

        <div className="auth-header">
          <span className="auth-logo">🐊</span>
          <button className="auth-close" onClick={onClose}>✕</button>
        </div>

        <div className="auth-tabs">
          <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => switchTab('login')}>
            Entrar
          </button>
          <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => switchTab('register')}>
            Cadastrar
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-welcome">
            {tab === 'login' ? (
              <>
                <h2>Bem-vindo de volta!</h2>
                <p>Entre para continuar seu pedido</p>
              </>
            ) : (
              <>
                <h2>Crie sua conta</h2>
                <p>Rápido e grátis — sem complicação</p>
              </>
            )}
          </div>

          {tab === 'register' && (
            <div className="auth-field">
              <label className="auth-label">Seu nome</label>
              <input
                className="auth-input"
                type="text"
                placeholder="Pedro Aruana"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                autoFocus
              />
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">E-mail</label>
            <input
              className="auth-input"
              type="email"
              placeholder="voce@email.com"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              autoFocus={tab === 'login'}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Senha</label>
            <div className="auth-input-wrap">
              <input
                className="auth-input"
                type={showPass ? 'text' : 'password'}
                placeholder="Mínimo 6 caracteres"
                value={form.password}
                onChange={e => set('password', e.target.value)}
              />
              <button type="button" className="auth-eye" onClick={() => setShowPass(s => !s)}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {error && <div className="auth-error">⚠️ {error}</div>}

          <button type="submit" className="auth-submit">
            {tab === 'login' ? '🔓 Entrar' : '🚀 Criar conta'}
          </button>

          <p className="auth-switch">
            {tab === 'login' ? 'Não tem conta?' : 'Já tem conta?'}
            <button type="button" onClick={() => switchTab(tab === 'login' ? 'register' : 'login')}>
              {tab === 'login' ? 'Cadastre-se' : 'Entrar'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
