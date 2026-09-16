import { useState, useEffect } from 'react'
import './CookieBanner.css'

const STORAGE_KEY = 'croco_cookie_consent'

export default function CookieBanner({ onPrivacidadeClick }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-label="Aviso de cookies">
      <p className="cookie-text">
        Este site usa armazenamento local do navegador (localStorage) para lembrar seu carrinho, endereços e preferências. Não usamos cookies de rastreamento ou publicidade.{' '}
        <button className="cookie-link" onClick={onPrivacidadeClick}>Saiba mais</button>
      </p>
      <button className="cookie-accept" onClick={accept}>Entendi</button>
    </div>
  )
}
