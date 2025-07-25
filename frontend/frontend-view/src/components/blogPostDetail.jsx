import { useState } from 'react'
import { createComment, updateComment, deleteComment } from '../api'
import { getCurrentUser, canModifyComment } from '../utils/authenticate'
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

const ButtonWrapper = styled.div`
  align-self: flex-end;
`

const CommentWrapper = styled.div`
  background-color: var(--secondary-color);
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 1rem;
`

const NewCommentWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
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
`

const ButtonsWrapper = styled.div`
  display: flex;
  margin: 1rem 0;
  gap: 1rem;
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

function BlogPostDetail({ post, onReturn, onCommentAdded, onCommentUpdated, onCommentDeleted }) {
  const [comments, setComments] = useState(post.comments || [])
  const [newComment, setNewComment] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editContent, setEditContent] = useState('')
  const [loading, setLoading] = useState({})
  const [error, setError] = useState('')

  const currentUser = getCurrentUser()

  const handleCreateComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) {
      return
    }
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
    setComments(prev => [...prev, optimisticComment])
    setNewComment('')
    setLoading(prev => ({ ...prev, create: true }))
    try {
      const createdComment = await createComment(newComment, post.id)
      setComments(prev => prev.map(comment =>
        comment.id === tempId ? createdComment : comment
      ))
      onCommentAdded(post.id, createdComment)
      setError('')
    } catch (err) {
      setComments(prev => prev.filter(comment => comment.id !== tempId))
      setError(err.message)
    } finally {
      setLoading(prev => ({ ...prev, create: false }))
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
    const updatedComment = { ...originalComment, content: editContent }
    setComments(prev => prev.map(comment =>
      comment.id ===commentId ? updatedComment : comment
    ))
    setEditingId(null)
    setLoading(prev => ({ ...prev, [commentId]: true }))
    try {
      const serverUpdatedComment = await updateComment(commentId, editContent)
      setComments(prev => prev.map(comment =>
        comment.id === commentId ? serverUpdatedComment : comment
      ))
      onCommentUpdated(post.id, commentId, serverUpdatedComment)
      setError('')
    } catch (err) {
      setComments(prev => prev.map(comment =>
        comment.id === commentId ? originalComment : comment
      ))
      setError(err.message)
    } finally {
      setLoading(prev => ({ ...prev, [commentId]: false }))
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return
    }
    const originalComments = comments
    setComments(prev => prev.filter(comment => comment.id !== commentId))
    setLoading(prev => ({ ...prev, [commentId]: true }))
    try {
      await deleteComment(commentId)
      onCommentDeleted(post.id, commentId)
      setError('')
    } catch (err) {
      setComments(originalComments)
      setError(err.message)
    } finally {
      setLoading(prev => ({ ...prev, [commentId]: false }))
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
        {currentUser && (
          <form onSubmit={handleCreateComment}>
            <NewCommentWrapper>
              <textarea
                rows='3'
                columns='80'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder='Add a comment ...'
                disabled={loading.create}
              />
              <button className='button' type='submit' disabled={loading.create || !newComment.trim()}>
                {loading.create ? <LoadingSpinner /> : 'Post comment'}
              </button>
            </NewCommentWrapper>
          </form>
        )}
        {comments.length > 0 ? (
          comments.map((comment) => (
              <Comment key={comment.id}>
                <p>{comment.content}</p>
                <UserDateWrapper>
                  <p>{comment.user?.username || 'Anonymous'}, {formatDate(comment.createdAt)}</p>
                </UserDateWrapper>
                {canModifyComment(comment) && (
                  <ButtonsWrapper>
                    <button className='button' onClick={() => handleEditStart(comment)} disabled={loading[comment.id]}>
                      Edit
                    </button>
                    <button className='button' onClick={() => handleDeleteComment(comment.id)} disabled={loading[comment.id]}>
                      Delete
                    </button>
                  </ButtonsWrapper>
                )}
                {editingId === comment.id ? (
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    handleUpdateComment(comment.id)
                  }}>
                    <NewCommentWrapper>
                      <textarea
                        rows='3'
                        columns='80'
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        autoFocus
                      />
                      <ButtonsWrapper>
                        <button className='button' type='submit'>
                          Save
                        </button>
                        <button className='button' type='button' onClick={handleEditCancel}>
                          Cancel
                        </button>
                      </ButtonsWrapper>
                    </NewCommentWrapper>
                  </form>
                ) : (
                  <div>
                    {loading[comment.id] && <LoadingSpinner />}
                  </div>
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
