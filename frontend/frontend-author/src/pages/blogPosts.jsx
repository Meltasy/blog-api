import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import AllBlogPosts from '../components/allBlogPosts'
import BlogPostDetail from '../components/blogPostDetail'

function BlogPosts() {
  const { allBlogPosts: initialBlogPosts } = useLoaderData()
  const [allBlogPosts, setAllBlogPosts] = useState(initialBlogPosts || [])
  const [selectedPost, setSelectedPost] = useState(null)

  const handlePostSelect = (post) => {
    setSelectedPost(post)
  }

  const handleReturnAll = () => {
    setSelectedPost(null)
  }

  const handlePostDeleted = (postId) => {
    setAllBlogPosts(prevPosts =>
      prevPosts.filter(post => post.id !== postId)
    )
  }

  return (
    <>
      <header>
        <h1>Zena's blog</h1>
      </header>
      <main>
        {selectedPost ? (
          <BlogPostDetail
            post={selectedPost}
            onReturn={handleReturnAll}
            onPostDeleted={handlePostDeleted}
          />
        ) : (
          <AllBlogPosts
            allBlogPosts={allBlogPosts}
            onPostSelect={handlePostSelect}
            onPostDeleted={handlePostDeleted}
          />
        )}
      </main>
    </>
  )
}

export default BlogPosts
