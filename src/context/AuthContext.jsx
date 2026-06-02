import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const USERS_KEY   = 'croco-users-v1'
const SESSION_KEY = 'croco-session-v1'

// Hash de senha via Web Crypto API (SHA-256) — nunca salva plaintext
async function hashPassword(password) {
  const data = new TextEncoder().encode(password)
  const buf  = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || [] } catch { return [] }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) } catch { return null }
  })

  async function register({ name, email, password }) {
    const users = getUsers()
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
      return { error: 'E-mail já cadastrado.' }

    const hash = await hashPassword(password)
    const user = { name, email: email.toLowerCase(), passwordHash: hash }
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]))

    const session = { name, email: email.toLowerCase() }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setCurrentUser(session)
    return { success: true }
  }

  async function login({ email, password }) {
    const users = getUsers()
    const user  = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!user) return { error: 'E-mail ou senha incorretos.' }

    const hash = await hashPassword(password)
    if (user.passwordHash !== hash) return { error: 'E-mail ou senha incorretos.' }

    const session = { name: user.name, email: user.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setCurrentUser(session)
    return { success: true }
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
