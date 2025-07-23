import { NavLink, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.message || 'Unknown error'}</i>
      </p>
      <NavLink to='/'>
        Take me home!
      </NavLink>
    </div>
  )
}

export default ErrorPage
