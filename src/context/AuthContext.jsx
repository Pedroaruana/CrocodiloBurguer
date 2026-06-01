import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const USERS_KEY   = 'croco-users-v1'
const SESSION_KEY = 'croco-session-v1'

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) } catch { return null }
  })

  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || [] } catch { return [] }
  }

  function register({ name, email, password }) {
    const users = getUsers()
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
      return { error: 'E-mail já cadastrado.' }
    const user = { name, email: email.toLowerCase(), password }
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]))
    const session = { name, email: email.toLowerCase() }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setCurrentUser(session)
    return { success: true }
  }

  function login({ email, password }) {
    const users = getUsers()
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!user) return { error: 'E-mail ou senha incorretos.' }
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
