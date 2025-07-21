import styled from 'styled-components'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { createComment, updateComment, deleteComment } from '../api'
import { getCurrentUser, canModifyComment } from '../utils/authenticate'

const Wrapper = styled.div`
  color: var(--background-color);
  background-color: var(--primary-color);max-width: 60rem;
  padding: 2rem;
  margin: 0 auto;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-self: space-between;
`

const ButtonWrapper = styled.div`
  align-self: flex-end;
`

const CommentWrapper = styled.div`
  background-color: var(--secondary-color);
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 1rem;
`

const Comment = styled.div`
  color: var(--secondary-color-dark);
  background-color: var(--secondary-color-light);
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 1rem;
  border-left: 20px solid var(--secondary-color-dark);
`

const UserDateWrapper = styled.div`
  font-size: 0.8rem;
  font-style: italic;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
`

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid var(--error-text-color);
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

// const CommentActions = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   margin-bottom: 1rem;
  
//   button {
//     padding: 0.25rem 0.5rem;
//     border: 1px solid var(--secondary-color-dark);
//     background: var(--secondary-color);
//     color: var(--secondary-color-dark);
//     border-radius: 0.25rem;
//     cursor: pointer;
//     font-size: 0.8rem;
    
//     &:hover {
//       background: var(--secondary-color-dark);
//       color: var(--secondary-color);
//     }
    
//     &:disabled {
//       opacity: 0.5;
//       cursor: not-allowed;
//     }
//   }
// `

// const LoginPrompt = styled.div`
//   text-align: center;
//   padding: 1rem;
//   background: var(--secondary-color-light);
//   border-radius: 0.5rem;
//   margin-bottom: 1rem;
  
//   a {
//     color: var(--primary-color);
//     text-decoration: none;
//     font-weight: bold;
    
//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `

function BlogPostDetail({ post, onReturn }) {
  const { user } = useOutletContext()
  const [comments, setComments] = useState(post.comments || [])
  const [newComment, setNewComment] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editContent, setEditContent] = useState('')
  const [loading, setLoading] = useState({})
  const [error, setError] = useState('')

  const currentUser = getCurrentUser()

  const handleCreateComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    if (!currentUser) {
      setError('Please log in to comment.')
      return
    }
    const tempId = `temp-${Date.now()}`
    const optimisticComment = {
      id: tempId,
      content: newComment,
      createdAt: new Date().toISOString(),
      userId: currentUser.id,
      blogPostId: post.id,
      user: { username: currentUser.username }
    }
    setComments(previous => [...previous, optimisticComment])
    setNewComment('')
    setLoading(previous => ({ ...previous, create: true }))
    try {
      const createdComment = await createComment(newComment, post.id)
      setComments(previous => previous.map(comment =>
        comment.id === tempId ? createdComment : comment
      ))
      setError('')
    } catch (err) {
      setComments(previous => previous.filter(comment => comment.id !== tempId))
      setError(err.message)
    } finally {
      setLoading(previous => ({ ...previous, create: false }))
    }
  }

  const handleEditStart = (comment) => {
    setEditingId(comment.id)
    setEditContent(comment.content)
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditContent('')
  }

  const handleUpdateComment = async (commentId) => {
    if (!editContent.trim()) {
      return
    }
    const originalComment = comments.find(comment => comment.id === commentId)
    setComments(previous => previous.map(comment =>
      comment.id ===commentId ? { ...comment, content: editContent} : comment
    ))
    setEditingId(null)
    setLoading(previous => ({ ...previous, [commentId]: true }))
    try {
      const updatedComment = await updateComment(commentId, editContent)
      setComments(previous => previous.map(comment =>
        comment.id === commentId ? updatedComment : comment
      ))
      setError('')
    } catch (err) {
      setComments(previous => previous.map(comment =>
        comment.id === commentId ? originalComment : comment
      ))
      setError(err.message)
    } finally {
      setLoading(previous => ({ ...previous, [commentId]: false }))
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return
    }
    const originalComments = comments
    setComments(Previous => previous.filter(comment => comment.id !== commentId))
    setLoading(previous => ({ ...previous, [commentId]: true }))
    try {
      await deleteComment(commentId)
      setError('')
    } catch (err) {
      setComments(originalComments)
      setError(err.message)
    } finally {
      setLoading(previous => ({ ...previous, [commentId]: false }))
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
    <Wrapper>
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
      <CommentWrapper>
        <h3>Comments ({comments.length})</h3>
        {error && (
          <div className='errors'>
            {error}
          </div>
        )}
        {/* {!currentUser && (
          <LoginPrompt>
            <a href='/login'>Login</a> or <a href='/signup'>Sign up</a> to post a comment
          </LoginPrompt>
        )} */}
        {currentUser && (
          <form onSubmit={handleCreateComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder='Add a comment ...'
              disabled={loading.create}
            />
            <div>
              <button className='button' type='submit' disabled={loading.create || !newComment.trim()}>
                {loading.create ? <LoadingSpinner /> : 'Post comment'}
              </button>
            </div>
          </form>
        )}
        {comments.length > 0 ? (
          comments.map((comment) => (
              <Comment key={comment.id}>
                {canModifyComment(comment) && (
                  <div>
                    <button className='button' onClick={() => handleEditStart(comment)} disabled={loading[comment.id]}>
                      Edit
                    </button>
                    <button className='button' onClick={() => handleDeleteComment(comment.id)} disabled={loading[comment.id]}>
                      Delete
                    </button>
                  </div>
                )}
                <p>{comment.content}</p>
                <UserDateWrapper>
                  <p>{comment.user?.username || 'Anonymous'}, {formatDate(comment.createdAt)}</p>
                </UserDateWrapper>
                {editingId === comment.id ? (
                  <form onSubmit={(e) => {
                    e.preventDefault
                    handleUpdateComment(comment.id)
                  }}>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      autoFocus
                    />
                    <div>
                      <button className='button' type='submit'>
                        Save
                      </button>
                      <button className='button' type='button' onClick={handleEditCancel}>
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <p>
                    {loading[comment.id] && <LoadingSpinner />}
                  </p>
                )}
              </Comment>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </CommentWrapper>
      <ButtonWrapper>
        <button className='button' onClick={onReturn}>
          Return to Blog posts
        </button>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default BlogPostDetail
