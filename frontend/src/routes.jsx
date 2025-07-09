import App from './App.jsx'
import LogIn from './pages/logIn.jsx'
import SignUp from './pages/signUp.jsx'
import ErrorPage from './pages/notFound.jsx'
import { getAllBlogPosts } from './api.js'

const blogPostsLoader = async () => {
  try {
    const blogPosts = await getAllBlogPosts()
    return { blogPosts }
  } catch (error) {
    throw new Error('Failed to load blog posts.')
  }
}

const routes = [
  {
    path: '/',
    element: <App />,
    loader: blogPostsLoader,
    errorElement: <ErrorPage />
  },
  {
    path: 'login',
    element: <LogIn />
  },
  {
    path: 'signup',
    element: <SignUp />
  }
]

export default routes
