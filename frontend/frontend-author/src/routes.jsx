import App from './App'
import BlogPosts from './pages/blogPosts'
import ErrorPage from './pages/notFound'
import { getAllBlogPosts, getDraftBlogPosts } from './api'

const allBlogPostsLoader = async () => {
  try {
    const { allBlogPosts, draftBlogPosts } = awaitPromise.all(
      getAllBlogPosts(),
      getDraftBlogPosts()
    )
    return { allBlogPosts, draftBlogPosts }
  } catch (error) {
    throw new Error('Failed to load all blog posts.')
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
        element: <BlogPosts />,
        loader: allBlogPostsLoader
      },
      {
        path: 'blogPosts',
        element: <BlogPosts />,
        loader: allBlogPostsLoader
      }
    ]
  }
]

export default routes
