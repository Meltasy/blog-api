import { useState, useEffect } from 'react'
import { getAllBlogPosts } from '../api'

function FullList(props) {
  return (
    <>
      {!props.blogPosts ? (
        <div>Loading ...</div>
      ) : props.blogPosts.length > 0 ? (
        <ul>
          {props.blogPosts.map((post) => {
            return (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>Comments: NEED TO ADD THIS</p>
            </li>
            )
          })}
        </ul>
      ) : (
        <div>There are no blog posts in the list!</div>
      )
    }
    </>
  )
}

function BlogPosts() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllBlogPosts()
      .then((data) => {
        setBlogPosts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error finding published blog posts.', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])


  return (
    <>
      { loading ? (
        <p>Loading posts ...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <FullList blogPosts={blogPosts} />
      )}
    </>
  )
}

export default BlogPosts
