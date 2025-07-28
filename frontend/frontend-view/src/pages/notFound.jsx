import { NavLink, useRouteError } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  color: var(--background-color);
  background-color: var(--primary-color);
  max-width: 60rem;
  padding: 2rem;
  margin: 0 auto;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ErrorWrapper = styled.div`
  font-weight: 700;
  align-self: flex-start;
`

const StyledLink = styled(NavLink)`
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--background-color);
  background-color: var(--primary-color-dark);
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
    align-self: flex-end;
  &:hover {
    color: var(--primary-color-dark);
    background-color: var(--primary-color-light);
  }
`

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <div>
      <header>
        <h1>Oops!</h1>
      </header>
      <Wrapper>
        <ErrorWrapper>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error?.message || 'Unknown error'}</i>
          </p>
        </ErrorWrapper>
        <StyledLink to='/'>
          Take me home!
        </StyledLink>
      </Wrapper>
    </div>
  )
}

export default ErrorPage
