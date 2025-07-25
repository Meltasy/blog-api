import { useState } from 'react'
import { deleteBlogPost } from '../api'
import styled from 'styled-components'

const Wrapper = styled.div`
  color: var(--background-color);
  background-color: var(--primary-color);
  max-width: 60rem;
  padding: 2rem;
  margin: 0 auto;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const DateWrapper = styled.div`
  font-size: 0.8rem;
  font-style: italic;
  font-weight: 700;
`

const Published = styled.p`
  font-style: italic;
  font-weight: bold;
  color: var(--secondary-color);
`

const ButtonsWrapper = styled.div`
  display: flex;
  margin: 1rem 0;
  gap: 1rem;
  justify-content: flex-end;
`

function BlogPostDetail({ post, onReturn, onPostDeleted }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isPublished = post.published ? 'Published' : 'Not yet published'

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return
    }
    setLoading(true)
    setError('')
    try {
      await deleteBlogPost(post.id)
      onPostDeleted(post.id)
      onReturn()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-fr', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Wrapper key={post.id}>
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p>{post.author.username}</p>
      </div>
      <DateWrapper>
        <p>{formatDate(post.createdAt)}</p>
      </DateWrapper>
      <div>
        <Published>
          {isPublished}
        </Published>
      </div>
      <div className='errorBox'>
        {error && <div className='errors'>{error}</div>}
      </div>
      <ButtonsWrapper>
        <button className='button' onClick={onReturn}>
          Return to Blog posts
        </button>
        <button className='button' onClick={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </ButtonsWrapper>
    </Wrapper>
  )
}

export default BlogPostDetail
