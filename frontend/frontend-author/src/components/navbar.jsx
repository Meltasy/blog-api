import { NavLink } from 'react-router-dom'
import { logout } from '../utils/authenticate'
import styled from 'styled-components'

const baseStyles = `
  font-family: inherit;
  font-size: 2rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--background-color);
  background-color: transparent;
  border: none;
  padding: 2rem;
  margin: 20px;
  cursor: pointer;
`

const linkStyles =`
  &.active {
    color: var(--primary-color);
    background-color: var(--background-color);
  }
  &:hover {
    color: var(--primary-color-dark);
    background-color: var(--primary-color-light);
  }
`

const StyledLink = styled(NavLink)`
  ${baseStyles}
  ${linkStyles}
`

const StyledBridge = styled.a`
  ${baseStyles}
  ${linkStyles}
`

const StyledButton = styled.button`
  ${baseStyles}
  &:hover {
    color: var(--primary-color-dark);
    background-color: var(--primary-color-light);
  }
`

function Navbar({ user, onLogout }) {
  const handleLogout = () => {
    logout()
    onLogout()
  }

  const VIEW_URL = import.meta.env.VITE_VIEW_URL
  const isAuthor = user && user.role === 'AUTHOR'

  return (
    <nav>
      <div>
        <StyledBridge href={`${VIEW_URL}`}>Main Blog</StyledBridge>
      </div>
      {isAuthor ? (
        <>
          <div>
            <StyledLink to='/blogPosts'>Blog Posts</StyledLink>
          </div>
          <div>
            <StyledLink to='/newPost'>Create Post</StyledLink>
          </div>
          <div>
            <StyledButton onClick={handleLogout}>Log out</StyledButton>
          </div>
        </>
      ) : (
        <div>
          <StyledLink to='/'>Log in</StyledLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar
