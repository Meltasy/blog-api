import App from './App'
import Home from './pages/home'
import BeAuthor from './pages/beAuthor'
import LogIn from './pages/logIn'
import SignUp from './pages/signUp'
import ErrorPage from './pages/notFound'
import { getAllBlogPosts, getAllCommentsForPost } from './api'

const allBlogPostsWithCommentsLoader = async () => {
  try {
    const allBlogPosts = await getAllBlogPosts()
    const blogPostsWithComments = await Promise.all(
      allBlogPosts.map(async (post) => {
        try {
          const comments = await getAllCommentsForPost(post.id)
          return { ...post, comments }
        } catch (error) {
          return { ...post, comments: [] }
        }
      })
    )
    return { allBlogPosts: blogPostsWithComments }
  } catch (error) {
    throw new Error('Failed to load blog posts with comments.')
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
        loader: allBlogPostsWithCommentsLoader
      },
      {
        path: 'home',
        element: <Home />,
        loader: allBlogPostsWithCommentsLoader
      },
      {
        path: 'author',
        element: <BeAuthor />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'login',
        element: <LogIn />
      }
    ]
  }
]

export default routes
