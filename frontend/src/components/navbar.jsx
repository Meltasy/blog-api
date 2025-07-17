import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledList = styled.ul`
  margin: auto;
  display: flex;
  gap: 4rem;
`

const StyledLink = styled(NavLink)`
  font-size: 2rem;
  text-decoration: none;
  color: var(--background-color);
  padding: 2.5rem;
  margin: 20px;
  &.active {
    color: var(--primary-color);
    background-color: var(--background-color);
    padding: 1.5rem;
  }
`

function Navbar() {
  return (
    <nav>
      <StyledList>
        <li>
          <StyledLink to='/'>Home</StyledLink>
        </li>
        <li>
          <StyledLink to='/signup'>Sign up</StyledLink>
        </li>
        <li>
          <StyledLink to='/login'>Log in</StyledLink>
        </li>
      </StyledList>
    </nav>
  )
}

export default Navbar
