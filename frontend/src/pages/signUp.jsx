import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../api'

function SignUp() {
  const [form, setForm] = useState({username: '', email: '', password: '', confirmPassword: ''})
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
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.'
    }
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,24}$/
    if (!passwordPattern.test(form.password)) {
      newErrors.password = 'Password must contain one number, one lowercase letter, one uppercase letter, one special character, no spaces, and be between 8 and 24 characters.'
    }
    if (!form.password) {
      newErrors.password = 'Password is required.'
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.'
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
      const response = await signup(form.username, form.email, form.password)
      localStorage.setItem('token', response.token)
      navigate('/home')
    } catch (error) {
      if (error.message.includes('username') || error.message.includes('email')) {
        setErrors({ general: 'This username or email already exsists. Please try different credentials or login.'})
      } else if (error.message.includes('400')) {
        setErrors({ general: 'Invalid input. Please check your information and try again.' })
      } else {
        setErrors({ general: error.message || 'An error occurred during signup. Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <header>
        <h1>Sign up</h1>
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
            <label htmlFor='email'>Email *</label>
            <input
              id='email'
              name='email'
              placeholder='nausicaa.nakamura@outlook.com'
              type='email'
              autoComplete='off'
              value={form.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && (
            <div className='errors'>
              {errors.email}
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
          <div>
            <label htmlFor='confirmPassword'>Confirm password *</label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              autoComplete='off'
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {errors.confirmPassword && (
            <div className='errors'>
              {errors.confirmPassword}
            </div>
          )}
          <div className='button'>
            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Signing up ...' : 'Sign up'}
            </button>
          </div>
        </form>
      </main>
    </>
  )
}

export default SignUp
