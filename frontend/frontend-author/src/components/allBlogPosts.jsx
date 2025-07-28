import { useState } from 'react'
import { deleteBlogPost, publishBlogPost } from '../api'
import BlogPost from './blogPost'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const ListWrapper = styled.div`
  flex: 1;
  min-width: 0;
`

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

function AllBlogPosts({ allBlogPosts, onPostSelect, onPostDeleted, onPostUpdated }) {
  const [loading, setLoading] = useState({})
  const [error, setError] = useState('')

  const publishedPosts = allBlogPosts.filter(post => post.published)
  const unpublishedPosts = allBlogPosts.filter(post => !post.published)

  const handleTogglePublish = async (postId, publishedStatus) => {
    const newStatus = !publishedStatus
    const action = newStatus ? 'publish' : 'unpublish'
    if (!confirm(`Are you sure you want to ${action} this post?`)) {
      return
    }
    setLoading(prev => ({ ...prev, [`publish_${postId}`]: true }))
    try {
      const updatedPost = await publishBlogPost(newStatus, postId)
      onPostUpdated(updatedPost)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(prev => ({ ...prev, [`publish_${postId}`]: false }))
    }
  }

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

  const blogPostList = (blogPosts, title) => (
    <ListWrapper>
      <h2>{title}</h2>
      {blogPosts.length > 0 ? (
        <StyledList>
          {blogPosts.map((post) => (
            <BlogPost
              key={post.id}
              post={post}
              onSelect={() => onPostSelect(post)}
              togglePublish={() => handleTogglePublish(post.id, post.published)}
              deleteBlogPost={() => handleDeletePost(post.id)}
              isPublishLoading={loading[`publish_${post.id}`]}
              isLoading={loading[post.id]}
            />
          ))}
        </StyledList>
      ) : (
        <StyledDiv>There are no {title.toLowerCase()}!</StyledDiv>
      )
    }
    </ListWrapper>
  )

  return (
    <>
      <div className='errorBox'>
        {error && <div className='errors'>{error}</div>}
      </div>
      {allBlogPosts.length > 0 ? (
        <Wrapper>
          {blogPostList(publishedPosts, 'Published Posts')}
          {blogPostList(unpublishedPosts, 'Unpublished Posts')}
        </Wrapper>
      ) : (
        <StyledDiv>There are no blog posts!</StyledDiv>
      )}
    </>
  )
}

export default AllBlogPosts
