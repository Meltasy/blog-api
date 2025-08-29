import { NavLink } from 'react-router-dom'
import { logout } from '../utils/authenticate'
import styled from 'styled-components'

const StyledNav = styled.div`
  background-color: rgb(255, 255, 255, 0.3);
  position: fixed;
  top: 0;
  width: 100%;
  height: 3rem;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  gap: 4rem;
`

const baseStyles = `
  font-family: inherit;
  font-size: 1.4rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--primary-color);
  background-color: transparent;
  border: none;
  padding: 0.65rem 1.3rem;
  cursor: pointer;
`

const linkStyles =`
  &.active {
    color: var(--primary-color-dark);
    font-size: 1.6rem;
  }
  &:hover {
    color: var(--background-color);
    font-size: 1.6rem;
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
    color: var(--background-color);
    font-size: 1.6rem;
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
    <StyledNav>
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
    </StyledNav>
  )
}

export default Navbar
