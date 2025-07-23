import { useState, useEffect } from 'react'
import GlobalStyles from './globalStyles'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar'
import { getCurrentUser } from './utils/authenticate'

const Wrapper = styled.main`
  margin-top: 8rem;
`

// Author frontend:
// Log in
// Display blog posts - both published and unpublished
// Create blog posts
// Edit and delete blog posts

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

  if (loading) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <GlobalStyles />
      <Navbar user={user} />
      <Wrapper>
        <Outlet context={{ user, onUserUpdate: handleUserUpdate }}/>
      </Wrapper>
    </>
  )
}

export default App
