function BlogPostItem({ post }) {
  return (
    <li key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>Comments: NEED TO ADD THIS</p>
    </li>
  )
}

function BlogPostList({ blogPosts }) {
  return (
    <>
      {blogPosts.length > 0 ? (
        <ul>
          {blogPosts.map((post) => (
            <BlogPostItem key={post.id} post={post} />
          ))}
        </ul>
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
