import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('curelex-current-user')
    return stored ? JSON.parse(stored) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)

  const login = (user, tok) => {
    localStorage.setItem('curelex-current-user', JSON.stringify(user))
    localStorage.setItem('token', tok)
    setCurrentUser(user)
    setToken(tok)
  }

  const logout = () => {
    localStorage.removeItem('curelex-current-user')
    localStorage.removeItem('token')
    setCurrentUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)