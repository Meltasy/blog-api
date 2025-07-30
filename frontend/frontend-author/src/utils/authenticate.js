const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

const isTokenExpired = (token) => {
  const decoded = decodeJWT(token)
  if (!decoded || !decoded.exp) {
    return true
  }
  const currentTime = Date.now() / 1000
  return decoded.exp < currentTime
}

const getCurrentUser = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return null
  }
  if (isTokenExpired(token)) {
    localStorage.removeItem('token')
    return null
  }
  const decoded = decodeJWT(token)
  return decoded ? {
    id: decoded.id,
    username: decoded.username,
    email: decoded.email,
    role: decoded.role
  } : null
}

const getUserHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` }: {}
}

const logout = () => {
  localStorage.removeItem('token')
  window.location.href = '/'
}

export {
  getCurrentUser,
  getUserHeader,
  logout
}
