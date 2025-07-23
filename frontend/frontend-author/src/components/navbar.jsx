import { NavLink } from 'react-router-dom'
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

function Navbar({ user }) {
  const VIEW_URL = import.meta.env.VITE_VIEW_URL
  const isAuthor = user && user.role === 'AUTHOR'

  return (
    <nav>
      <div>
        <StyledBridge href={`${VIEW_URL}`}>Home</StyledBridge>
      </div>
      {isAuthor && (
        <div>
          <StyledLink to='/blogPosts'></StyledLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar
