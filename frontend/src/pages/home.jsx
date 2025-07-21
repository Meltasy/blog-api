import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import AllBlogPosts from '../components/allBlogPosts.jsx'
import BlogPostDetail from '../components/blogPostDetail.jsx'

function Home() {
  const { allBlogPosts } = useLoaderData()
  const [selectedPost, setSelectedPost] = useState(null)

  const handlePostSelect = (post) => {
    setSelectedPost(post)
  }

  const handleReturnAll = () => {
    setSelectedPost(null)
  }

  return (
    <>
      <header>
        <h1>Zena's blog</h1>
      </header>
      <main>
        {selectedPost ? (
          <BlogPostDetail post={selectedPost} onReturn={handleReturnAll} />
        ) : (
          <AllBlogPosts allBlogPosts={allBlogPosts} onPostSelect={handlePostSelect} />
        )}
      </main>
    </>
  )
}

export default Home
