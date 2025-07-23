import { getUserHeader } from './utils/authenticate'

const API_URL = import.meta.env.VITE_API_URL

const userHeader = () => ({
  'Content-type': 'application/json',
  ...getUserHeader()
})

async function getAllBlogPosts() {
  const response = await fetch(`${API_URL}/blogPosts`, { mode: 'cors' })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to find published blog posts: ${response.status}`)
  }
  console.log(response)
  return response.json()
}

async function getDraftBlogPosts() {
  const response = await fetch(`${API_URL}/blogPosts`, { mode: 'cors' })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to find unpublished blog posts: ${response.status}`)
  }
  console.log(response)
  return response.json()
}

async function getBlogPost(blogPostId) {
const response = await fetch(`${API_URL}/blogPosts/${blogPostId}`, { mode: 'cors' })
if (!response.ok) {
  const errorData = await response.json()
  throw new Error(errorData.error || `Failed to find blog post ${blogPostId}: ${response.status}`)
}
console.log(response)
return response.json()
}

export {
  getAllBlogPosts,
  getDraftBlogPosts,
  getBlogPost
}
