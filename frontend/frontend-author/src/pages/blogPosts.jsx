import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import BlogPostDetail from '../components/blogPostDetail'
import AllBlogPosts from '../components/allBlogPosts'

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

  const handleCommentDeleted = (postId) => {
    // Need to complete!
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
          />
        ) : (
          <AllBlogPosts
            allBlogPosts={allBlogPosts}
            onPostSelect={handlePostSelect}
            onPostDeleted={handleCommentDeleted}
          />
        )}
      </main>
    </>
  )
}

export default BlogPosts
