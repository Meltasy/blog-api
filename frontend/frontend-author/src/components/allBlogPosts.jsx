import { getCurrentUser, canModifyPost } from '../utils/authenticate'
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
  const [blogPosts, setBlogPosts] = useState(allBlogPosts || [])
  const [loading, setLoading] = useState({})
  const [error, setError] = useState('')

  const currentUser = getCurrentUser()

  const handleDeletePost = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return
    }
    const originalPosts = posts
    setBlogPosts(previous => previous.filter(post => post.id !== postId))
    setLoading(previous => ({ ...previous, [postId]: true }))
    try {
      await deletePost(postId)
      onPostDeleted(postId)
      setError('')
    } catch (err) {
      setPosts(originalPosts)
      setError(err.message)
    } finally {
      setLoading(previous => ({ ...previous, [postId]: false }))
    }
  }

  return (
    <>
      {allBlogPosts.length > 0 ? (
        <StyledList>
          {allBlogPosts.map((post) => (
            <BlogPost
              key={post.id}
              post={post}
              onSelect={() => onPostSelect(post)}
              deletePost={() => handleDeletePost(post.id)}/>

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
