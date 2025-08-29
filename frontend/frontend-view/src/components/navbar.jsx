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

  const isAuthor = user && user.role === 'AUTHOR'
  const AUTHOR_URL = import.meta.env.VITE_AUTHOR_URL

  return (
    <StyledNav>
      <div>
        <StyledLink to='/'>Home</StyledLink>
      </div>
      { user ? (
        <>
          {!isAuthor && (
            <div>
              <StyledLink to='/beAuthor'>Become author</StyledLink>
            </div>
          )}
          {isAuthor && (
            <div>
              <StyledBridge href={`${AUTHOR_URL}`}>Author Log in</StyledBridge>
            </div>
          )}
          <div>
            <StyledButton onClick={handleLogout}>Log out</StyledButton>
          </div>
        </>
      ) : (
      <>
        <div>
          <StyledLink to='/signup'>Sign up</StyledLink>
        </div>
        <div>
          <StyledLink to='/login'>Log in</StyledLink>
        </div>
      </>
      )}
    </StyledNav>
  )
}

export default Navbar
