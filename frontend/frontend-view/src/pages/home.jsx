import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import AllBlogPosts from '../components/allBlogPosts.jsx'
import BlogPostDetail from '../components/blogPostDetail.jsx'

function Home() {
  const { publishedBlogPosts: initialBlogPosts } = useLoaderData()
  const [publishedBlogPosts, setPublishedBlogPosts] = useState(initialBlogPosts || [])
  const [selectedPost, setSelectedPost] = useState(null)

  const handlePostSelect = (post) => {
    setSelectedPost(post)
  }

  const handleReturnAll = () => {
    setSelectedPost(null)
  }

  const handleCommentAdded = (postId, newComment) => {
    setPublishedBlogPosts(prevPosts =>
      prevPosts.map(post => post.id === postId
        ? { ...post, comments: [ ...(post.comments || []), newComment] }
        : post
      )
    )
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => ({ 
        ...prev,
        comments: [...(prev.comments || []), newComment]
      }))
    }
  }

  const handleCommentUpdated = (postId, commentId, updatedComment) => {
    setPublishedBlogPosts(prevPosts =>
      prevPosts.map(post => post.id === postId
        ? { ...post, comments: post.comments.map(comment => comment.id === commentId
        ? updatedComment : comment )}
        : post
      ))
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => ({
        ...prev,
        comments: prev.comments.map(comment => comment.id === commentId
          ? updatedComment
          : comment
        )
      }))
    }
  }

  const handleCommentDeleted = (postId, commentId) => {
    setPublishedBlogPosts(prevPosts =>
      prevPosts.map(post => post.id === postId
        ? { ...post, comments: post.comments.filter(comment => comment.id !== commentId)}
        : post
      ))
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => ({
        ...prev,
        comments: prev.comments.filter(comment => comment.id !== commentId )
      }))
    }
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
            onCommentAdded={handleCommentAdded}
            onCommentUpdated={handleCommentUpdated}
            onCommentDeleted={handleCommentDeleted}
          />
        ) : (
          <AllBlogPosts publishedBlogPosts={publishedBlogPosts} onPostSelect={handlePostSelect} />
        )}
      </main>
    </>
  )
}

export default Home
