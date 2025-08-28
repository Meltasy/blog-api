import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { getCurrentUser } from './utils/authenticate'
import Navbar from './components/navbar'
import Footer from './components/footer'
import styled from 'styled-components'

const Wrapper = styled.main`
  margin-top: 8rem;
`

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
      <Navbar user={user} onLogout={handleLogout} />
      <Wrapper>
        <Outlet context={{ user, onUserUpdate: handleUserUpdate }}/>
      </Wrapper>
      <Footer />
    </>
  )
}

export default App
