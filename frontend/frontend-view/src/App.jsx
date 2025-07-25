import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { getCurrentUser } from './utils/authenticate'
import Navbar from './components/navbar'
import GlobalStyles from './globalStyles'
import styled from 'styled-components'

const Wrapper = styled.main`
  margin-top: 8rem;
`

// User frontend:
// Sign Up and Log In
// Display published blog posts and comments
// Create, edit and delete own comments
// Become author redirects to /home ... but will need to give access to other frontend

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const handleUserUpdate = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  if (loading) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <GlobalStyles />
      <Navbar user={user} onLogout={handleLogout} />
      <Wrapper>
        <Outlet context={{ user, onUserUpdate: handleUserUpdate }}/>
      </Wrapper>
    </>
  )
}

export default App
