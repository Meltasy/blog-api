import GlobalStyles from './globalStyles'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar'

const Wrapper = styled.main`
  margin-top: 8rem;
`

// User frontend:
// Sign Up and Log In
// Display published blog posts and comments
// Create, edit and delete own comments
// Become author - this redirects to other frontend?

// Author frontend:
// Log in
// Display blog posts - both published and unpublished
// Create blog posts
// Edit and delete blog posts

function App() {
   return (
    <>
      <GlobalStyles />
      <Navbar />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </>
  )
}

export default App
