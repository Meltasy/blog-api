import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { login } from '../api'
import { getCurrentUser } from '../utils/authenticate'

function LogIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { onUserUpdate } = useOutletContext()

  const validateForm = () => {
    const newErrors = {}
    if (!username.trim()) {
      newErrors.username = 'Username is required.'
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required.'
    }
    return newErrors
  }

  const hasErrors = Object.keys(errors).length > 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setLoading(true)
    setErrors({})
    try {
      const response = await login(username, password)
      localStorage.setItem('token', response.token)
      const user = getCurrentUser()
      onUserUpdate(user)
      navigate('/')
    } catch (error) {
      if (error.message.includes('username is incorrect') || error.message.includes('password is incorrect')) {
        setErrors({ general: 'Invalid username or password.' })
      } else {
        setErrors({ general: error.message })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
    if (errors.username) {
      const newErrors = { ...errors }
      delete newErrors.username
      setErrors(newErrors)
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (errors.password) {
      const newErrors = { ...errors }
      delete newErrors.password
      setErrors(newErrors)
    }
  }

  return (
    <>
      <header>
        <h1>Log in</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className='errorBox'>
            {errors.general && <div className='errors'>{errors.general}</div>}
          </div>
          <div>
            <label htmlFor='username'>Full Name *</label>
            <input
              id='username'
              name='username'
              placeholder='Nausicaa Nakamura'
              type='text'
              autoComplete='off'
              value={username}
              onChange={handleUsernameChange}
              autoFocus
              required
            />
            <div className='errorBox'>
              {errors.username && <div className='errors'>{errors.username}</div>}
            </div>
          </div>
          <div>
            <label htmlFor='password'>Password *</label>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='off'
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <div className='errorBox'>
              {errors.password && <div className='errors'>{errors.password}</div>}
            </div>
          </div>
          <div className='buttonBox'>
            <button className='button' type='submit' disabled={loading || hasErrors}>
              {loading ? 'logging in ...' : 'Log in'}
            </button>
          </div>
        </form>
      </main>
    </>
  )
}

export default LogIn
