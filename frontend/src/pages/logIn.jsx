import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'

function LogIn() {
  const [form, setForm] = useState({username: '', password: ''})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!form.username.trim()) {
      newErrors.username = 'Username is required.'
    }
    if (!form.password.trim()) {
      newErrors.password = 'Password is required.'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 8 characters.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    if (!validateForm()) {
      return
    }
    setIsSubmitting(true)
    try {
      const response = await login(form.username, form.password)
      localStorage.setItem('token', response.token)
      navigate('/home')
    } catch (error) {
      if (error.message.includes('401')) {
        setErrors({ general: 'Invalid username or password. Please try again.' })
      } else if (error.message.includes('500')) {
        setErrors({ general: 'Server error. Pleasse try again later.' })
      } else if (error.message.includes('Failed to fetch')) {
        setErrors({ general: 'Network error. Please check your connection.' })
      } else {
        setErrors({ general: error.message || 'An error occurred during login. Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <header>
        <h1>Log in</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} noValidate>
          {errors.general && (
            <div className='errors'>
              {errors.general}
            </div>
          )}
          <div>
            <label htmlFor='username'>Full Name *</label>
            <input
              id='username'
              name='username'
              placeholder='Nausicaa Nakamura'
              type='text'
              autoComplete='off'
              value={form.username}
              onChange={handleChange}
              autoFocus
            />
          </div>
          {errors.username && (
            <div className='errors'>
              {errors.username}
            </div>
          )}
          <div>
            <label htmlFor='password'>Password *</label>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='off'
              value={form.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && (
            <div className='errors'>
              {errors.password}
            </div>
          )}
          <div className='button'>
            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'logging in ...' : 'Log in'}
            </button>
          </div>
        </form>
      </main>
    </>
  )
}

export default LogIn
