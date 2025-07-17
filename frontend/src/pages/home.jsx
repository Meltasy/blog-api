import { useLoaderData } from 'react-router-dom'
import BlogPosts from '../components/blogPosts.jsx'

function Home() {
  const { blogPosts } = useLoaderData()
  return (
    <>
      <h1>Zena's blog</h1>
      <BlogPosts blogPosts={blogPosts} />
    </>
  )
}

export default Home
