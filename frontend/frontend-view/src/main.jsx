import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes'
import GlobalStyles from './assets/globalStyles'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyles />
    <RouterProvider router={router} />
  </StrictMode>
)
