import styled from 'styled-components'

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
`

const StyledItem = styled.li`
  width: 40rem;
  height: 15rem;
  padding: 1rem;
  color: var(--background-color);
  background-color: var(--primary-color);
  align-self: center;
`

function BlogPostItem({ post }) {
  return (
    <StyledItem key={post.id}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Comments: NEED TO ADD THIS</p>
    </StyledItem>
  )
}

function BlogPostList({ blogPosts }) {
  return (
    <>
      {blogPosts.length > 0 ? (
        <StyledList>
          {blogPosts.map((post) => (
            <BlogPostItem key={post.id} post={post} />
          ))}
        </StyledList>
      ) : (
        <div>There are no blog posts in the list!</div>
      )
    }
    </>
  )
}

function BlogPosts({ blogPosts }) {
  return (<BlogPostList blogPosts={blogPosts} />)
}

export default BlogPosts
