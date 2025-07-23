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

const canModifyPost = (post) => {
  const currentUser = getCurrentUser()
  if (!currentUser) {
    return false
  }
  return comment.userId === currentUser.id || currentUser.role === 'AUTHOR'
}

// Need to change this to only accept users if they are authors ...
const isAuthenticated = () => {
  return getCurrentUser() !== null
}

const getUserHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` }: {}
}

export {
  getCurrentUser,
  canModifyPost,
  isAuthenticated,
  getUserHeader
}
