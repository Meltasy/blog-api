import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { becomeAuthor } from '../api'
import { getCurrentUser } from '../utils/authenticate'

function BeAuthor() {
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { onUserUpdate } = useOutletContext()
  
  const currentUser = getCurrentUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!currentUser) {
      setError('Please log in to become author.')
    }
    if (!passcode.trim()) {
      setError('Passcode is required.')
    }
    if (passcode !== import.meta.env.VITE_PASSCODE) {
      setError('Passcode is incorrect. Please try again.')
    }
    setLoading(true)
    try {
      const data = await becomeAuthor()
      if (data.token) {
        localStorage.setItem('token', data.token)
        const updatedUser = getCurrentUser()
        onUserUpdate(updatedUser)
      } else {
        const updatedUser = { ...currentUser, role: 'AUTHOR'}
        onUserUpdate(updatedUser)
      }
      navigate('/')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value)
    if (error) {
      setError('')
    }
  }

  return (
    <>
      <header>
        <h1>Become Author</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className='errorBox'>
            {error && <div className='errors'>{error}</div>}
          </div>
          <div>
            <label htmlFor='passcode'>Passcode *</label>
            <input
              id='passcode'
              name='passcode'
              type='text'
              autoComplete='off'
              value={passcode}
              onChange={handlePasscodeChange}
              autoFocus
              required
            />
          </div>
          <div className='buttonBox'>
            <button className='button' type='submit' disabled={loading}>
              {loading ? 'becoming author ...' : 'Become author'}
            </button>
          </div>
        </form>
      </main>
    </>
  )
}

export default BeAuthor
