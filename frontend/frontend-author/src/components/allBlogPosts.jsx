import { useState } from 'react'
import { deleteBlogPost } from '../api'
import BlogPost from './blogPost'
import styled from 'styled-components'

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0 1rem;
  justify-content: center;
`

const StyledDiv = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  margin-top: 2rem;
`

function AllBlogPosts({ allBlogPosts, onPostSelect, onPostDeleted }) {
  const [loading, setLoading] = useState({})
  const [error, setError] = useState('')

  const handleDeletePost = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return
    }
    setLoading(prev => ({ ...prev, [postId]: true }))
    try {
      await deleteBlogPost(postId)
      onPostDeleted(postId)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(prev => ({ ...prev, [postId]: false }))
    }
  }

  return (
    <>
      <div className='errorBox'>
        {error && <div className='errors'>{error}</div>}
      </div>
      {allBlogPosts.length > 0 ? (
        <StyledList>
          {allBlogPosts.map((post) => (
            <BlogPost
              key={post.id}
              post={post}
              onSelect={() => onPostSelect(post)}
              deleteBlogPost={() => handleDeletePost(post.id)}
              isLoading={loading[post.id]}
            />
          ))}
        </StyledList>
      ) : (
        <StyledDiv>There are no blog posts in the list!</StyledDiv>
      )
    }
    </>
  )
}

export default AllBlogPosts
