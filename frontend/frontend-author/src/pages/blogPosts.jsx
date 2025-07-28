import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import AllBlogPosts from '../components/allBlogPosts'
import EditPost from './editPost'

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

  const handlePostUpdated = (updatedPost) => {
    setAllBlogPosts(prevPosts => {
      return prevPosts.map(post =>
        post.id === updatedPost.id ? updatedPost : post
      )
    })
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
          <EditPost
            post={selectedPost}
            onReturn={handleReturnAll}
            onPostUpdated={handlePostUpdated}
          />
        ) : (
          <AllBlogPosts
            allBlogPosts={allBlogPosts}
            onPostSelect={handlePostSelect}
            onPostDeleted={handlePostDeleted}
            onPostUpdated={handlePostUpdated}
          />
        )}
      </main>
    </>
  )
}

export default BlogPosts
