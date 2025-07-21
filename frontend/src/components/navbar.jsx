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
  border-radius: 0.5rem;
  padding: 2.5rem;
  margin: 20px;
  cursor: pointer;
`

const StyledLink = styled(NavLink)`
  ${baseStyles}
  &.active {
    color: var(--primary-color);
    background-color: var(--background-color);
  }
  &:hover {
    color: var(--primary-color-dark);
    background-color: var(--background-color);
  }
`

const StyledButton = styled.button`
  ${baseStyles}
  &:hover {
    color: var(--primary-color-dark);
    background-color: var(--background-color);
  }
`

function Navbar({ user, onLogout }) {
  const handleLogout = () => {
    logout()
    onLogout()
  }

  return (
    <nav>
      <div>
        <StyledLink to='/'>Home</StyledLink>
      </div>
      { user ? (
        <div>
          <StyledButton onClick={handleLogout}>Logout</StyledButton>
        </div>
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
    </nav>
  )
}

export default Navbar
