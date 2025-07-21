import BlogPost from './blogPost'
import styled from 'styled-components'

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0 1rem;
  justify-content: center;
`

function AllBlogPosts({ allBlogPosts, onPostSelect }) {
  return (
    <>
      {allBlogPosts.length > 0 ? (
        <StyledList>
          {allBlogPosts.map((post) => (
            <BlogPost key={post.id} post={post} onSelect={() => onPostSelect(post)} />
          ))}
        </StyledList>
      ) : (
        <div>There are no blog posts in the list!</div>
      )
    }
    </>
  )
}

export default AllBlogPosts
