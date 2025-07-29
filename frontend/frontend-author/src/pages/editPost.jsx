import { useState } from 'react'
import { editBlogPost } from '../api'
import styled from 'styled-components'

const FormWrapper = styled.form`
  align-items: flex-start;
`

const Content = styled.textarea`
  min-width: 600px;
`

const LabelWrapper = styled.label`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

const Checkbox = styled.input`
  min-height: 25px;
  min-width: 25px;
  cursor: pointer;
`

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 1rem 0;
  gap: 1rem;
  justify-content: center;
`

function EditPost({ post, onReturn, onPostUpdated }) {
  const [title, setTitle] = useState(`${post.title}`)
  const [content, setContent] = useState(`${post.content}`)
  const [isPublished, setIsPublished] = useState(post.published)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

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
      await editBlogPost(title, content, isPublished, post.id)
      onPostUpdated({
        ...post,
        title,
        content,
        published: isPublished
      })
      onReturn()
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
        <LabelWrapper htmlFor='published'>
          <Checkbox
            id='published'
            name='published'
            type='checkbox'
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          Publish immediately
        </LabelWrapper>
        <ButtonsWrapper>
          <button className='button' onClick={onReturn}>
            Cancel
          </button>
          <button className='button' type='submit' disabled={loading}>
            {loading ? 'saving ...' : 'Save'}
          </button>
        </ButtonsWrapper>
      </FormWrapper>
    </>
  )
}

export default EditPost