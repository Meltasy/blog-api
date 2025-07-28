import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { createBlogPost } from '../api'
import { getCurrentUser } from '../utils/authenticate'
import styled from 'styled-components'

const FormWrapper = styled.form`
  align-items: flex-start;
`

const Content = styled.textarea`
  min-width: 600px;
`

const Checkbox = styled.input`
  min-height: 25px;
  min-width: 25px;
`

function NewPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { onUserUpdate } = useOutletContext()

  const validateForm = () => {
    const newErrors = {}
    if (!title.trim()) {
      newErrors.title = 'Title is required.'
    }
    if (!content.trim()) {
      newErrors.content = 'Content is required.'
    }
    return newErrors
  }

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
      await createBlogPost(title, content, isPublished)
      const user = getCurrentUser()
      onUserUpdate(user)
      navigate('/blogPosts')
    } catch (error) {
      setErrors({ general: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    if (errors.title) {
      const newErrors = { ...errors }
      delete newErrors.title
      delete newErrors.general
      setErrors(newErrors)
    }
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
    if (errors.content) {
      const newErrors = { ...errors }
      delete newErrors.content
      delete newErrors.general
      setErrors(newErrors)
    }
  }

  return (
    <>
      <header>
        <h1>Blog Post</h1>
      </header>
      <main>
        <FormWrapper onSubmit={handleSubmit}>
          <div className='errorBox'>
            {errors.general && <div className='errors'>{errors.general}</div>}
          </div>
          <label htmlFor='title'>Title *</label>
          <input
            id='title'
            name='title'
            placeholder='Give your blog post a title ...'
            type='text'
            autoComplete='off'
            value={title}
            onChange={handleTitleChange}
            autoFocus
            required
          />
          <div className='errorBox'>
            {errors.title && <div className='errors'>{errors.title}</div>}
          </div>
          <label htmlFor='content'>Content *</label>
          <Content
            id='content'
            name='content'
            placeholder='Write your bog post here ...'
            rows='10'
            cols='50'
            autoComplete='off'
            value={content}
            onChange={handleContentChange}
            required
          />
          <div className='errorBox'>
            {errors.content && <div className='errors'>{errors.content}</div>}
          </div>
          <label htmlFor='published'>
            <Checkbox
              id='published'
              name='published'
              type='checkbox'
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            Publish immediately
          </label>
          <div className='buttonBox'>
            <button className='button' type='submit' disabled={loading}>
              {loading ? 'saving ...' : 'Save'}
            </button>
          </div>
        </FormWrapper>
      </main>
    </>
  )
}

export default NewPost