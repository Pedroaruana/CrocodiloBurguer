import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const USERS_KEY = 'croco-users-v1'
const SESSION_KEY = 'croco-session-v1'

async function hashPassword(password) {
  // crypto.subtle só funciona em contexto seguro (HTTPS ou localhost).
  // Quando o app é acessado via IP de rede no celular, usa fallback simples.
  if (window.isSecureContext && crypto?.subtle) {
    const data = new TextEncoder().encode(password)
    const buf = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  }

  // Fallback: hash simples baseado em DJB2 + sal fixo
  let hash = 5381
  const salted = 'croco-salt-' + password
  for (let i = 0; i < salted.length; i++) {
    hash = ((hash << 5) + hash) ^ salted.charCodeAt(i)
  }
  return 'fallback:' + (hash >>> 0).toString(16)
}

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(loadSession)

  async function register({ name, email, password }) {
    const normalized = email.toLowerCase()
    const users = loadUsers()

    if (users.some((u) => u.email === normalized)) {
      return { error: 'E-mail já cadastrado.' }
    }

    const passwordHash = await hashPassword(password)
    const user = { name, email: normalized, passwordHash }
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]))

    const session = { name, email: normalized }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setCurrentUser(session)
    return { success: true }
  }

  async function login({ email, password }) {
    const normalized = email.toLowerCase()
    const user = loadUsers().find((u) => u.email === normalized)
    if (!user) return { error: 'E-mail ou senha incorretos.' }

    const passwordHash = await hashPassword(password)
    if (user.passwordHash !== passwordHash) {
      return { error: 'E-mail ou senha incorretos.' }
    }

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
