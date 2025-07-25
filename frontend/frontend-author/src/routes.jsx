import App from './App'
import LogIn from './pages/logIn'
import BlogPosts from './pages/blogPosts'
import NewPost from './pages/newPost'
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
        element: <LogIn />
      },
      {
        path: 'login',
        element: <LogIn />
      },
      {
        path: 'blogPosts',
        element: <BlogPosts />,
        loader: allBlogPostsWithCommentsLoader
      },
      {
        path: 'newPost',
        element: <NewPost />
      }
    ]
  }
]

export default routes
