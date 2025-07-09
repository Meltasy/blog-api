import { useLoaderData } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import BlogPosts from './components/blogPosts.jsx'

// User frontend:
// Sign Up and Log In
// Display published blog posts and comments
// Create, edit and delete own comments
// Become author - this redirects to other frontend?

// Author frontend:
// Log in
// Display blog posts - both published and unpublished
// Create blog posts
// Edit and delete blog posts

function App() {
  const { blogPosts } = useLoaderData()
  
  return (
    <>
      <Navbar />
      <h1>Zena's blog</h1>
      <BlogPosts blogPosts={blogPosts} />
    </>
  )
}

export default App
