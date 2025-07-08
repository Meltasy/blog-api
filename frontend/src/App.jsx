import { useState } from 'react'
import Navbar from './components/navbar.jsx'
import BlogPosts from './components/blogPosts.jsx'
import './assets/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <h1>Zena's blog</h1>
      <BlogPosts />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
