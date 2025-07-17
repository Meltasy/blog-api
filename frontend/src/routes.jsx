import App from './App.jsx'
import Home from './pages/home'
import LogIn from './pages/logIn'
import SignUp from './pages/signUp'
import ErrorPage from './pages/notFound'
import { getAllBlogPosts } from './api'

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
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: blogPostsLoader
      },
      {
        path: 'home',
        element: <Home />,
        loader: blogPostsLoader
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
  }
]

export default routes
