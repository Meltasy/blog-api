import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { signup } from '../api'
import { getCurrentUser } from '../utils/authenticate'

function SignUp() {
  const [form, setForm] = useState({username: '', email: '', password: '', confirmPassword: ''})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { onUserUpdate } = useOutletContext()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) {
      const newErrors = { ...errors }
      delete newErrors[name]
      setErrors(newErrors)
    }
    if (name === 'password' && errors.confirmPassword) {
      const newErrors = { ...errors }
      delete newErrors.confirmPassword
      setErrors(newErrors)
    }
    if (errors.general) {
      const newErrors = { ...errors }
      delete newErrors.general
      setErrors(newErrors)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!form.username.trim()) {
      newErrors.username = 'Username is required.'
    } else if (form.username.length < 6 && form.username.length > 60) {
      newErrors.username = 'Username must be between 6 and 60 characters.'
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.'
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(form.email)) {
        newErrors.email = 'Please enter a valid email address.'
      }
    }
    if (!form.password) {
      newErrors.password = 'Password is required.'
    } else {
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,24}$/
      if (!passwordPattern.test(form.password)) {
        newErrors.password = 'Password must contain one number, one lowercase letter, one uppercase letter, one special character, no spaces, and be between 8 and 24 characters.'
      }
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.'
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    setLoading(true)
    setErrors({})
    try {
      const response = await signup(form.username, form.email, form.password)
      localStorage.setItem('token', response.token)
      const user = getCurrentUser()
      onUserUpdate(user)
      navigate('/')
    } catch (error) {
      if (error.message.includes('username') || error.message.includes('email')) {
        setErrors({ general: 'This username or email already exists. Please try different credentials or login.' })
      } else if (error.message.includes('400')) {
        setErrors({ general: 'Invalid input. Please check your information and try again.' })
      } else {
        setErrors({ general: error.message || 'An error occurred during signup. Please try again.' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <header>
        <h1>Sign up</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className = 'errorBox'>
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
              title='Full name must be between 6 and 60 characters.'
              value={form.username}
              onChange={handleChange}
              autoFocus
              required
            />
            <div className = 'errorBox'>
              {errors.username && <div className='errors'>{errors.username}</div>}
            </div>
          </div>
          <div>
            <label htmlFor='email'>Email *</label>
            <input
              id='email'
              name='email'
              placeholder='nausicaa.nakamura@outlook.com'
              type='email'
              autoComplete='off'
              title='Email must be between 6 and 60 characters.'
              value={form.email}
              onChange={handleChange}
              required
            />
            <div className = 'errorBox'>
              {errors.email && <div className='errors'>{errors.email}</div>}
            </div>
          </div>
          <div>
            <label htmlFor='password'>Password *</label>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='off'
              title='Password must contain one number, one lowercase letter, one uppercase letter, one special character, no spaces, and be between 8 and 24 characters.'
              value={form.password}
              onChange={handleChange}
              required
            />
            <div className = 'errorBox'>
              {errors.password && <div className='errors'>{errors.password}</div>}
            </div>
          </div>
          <div>
            <label htmlFor='confirmPassword'>Confirm password *</label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              autoComplete='off'
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <div className = 'errorBox'>
              {errors.confirmPassword && <div className='errors'>{errors.confirmPassword}</div>}
            </div>
          </div>
          <div className='buttonBox'>
            <button className='button' type='submit' disabled={loading}>
              {loading ? 'Signing up ...' : 'Sign up'}
            </button>
          </div>
        </form>
      </main>
    </>
  )
}

export default SignUp
