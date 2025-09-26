import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const decodeAndSetUser = (token) => {
    const decoded = jwtDecode(token)

    const userData = {
      id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
      email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      firstName: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
      lastName: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'],
      roles: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    }
    setUser(userData)
    return userData
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token)
      decodeAndSetUser(token)
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading, decodeAndSetUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
