import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/signup'>Sign up</Link>
        </li>
        <li>
          <Link to='/login'>Log in</Link>
        </li>
      </ul>
    </>
  )
}

export default Navbar
