import { Link, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.message || 'Unknown error'}</i>
      </p>
      <Link to='/'>
        Take me home!
      </Link>
    </div>
  )
}

export default ErrorPage
