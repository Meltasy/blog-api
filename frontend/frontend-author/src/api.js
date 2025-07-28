import { getUserHeader } from './utils/authenticate'

const API_URL = import.meta.env.VITE_API_URL

const header = () => ({
  'Content-type': 'application/json'
})

const userHeader = () => ({
  ...header(),
  ...getUserHeader()
})

async function login(username, password) {
  const response = await fetch(`${API_URL}/login`, {
    mode: 'cors',
    method: 'POST',
    headers: header(),
    body: JSON.stringify({ username, password })
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to log in: ${response.status}`)
  }
  return response.json()
}

async function getAllBlogPosts() {
  const response = await fetch(`${API_URL}/blogPosts`, { mode: 'cors' })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to find all blog posts: ${response.status}`)
  }
  return response.json()
}

async function getBlogPost(blogPostId) {
  const response = await fetch(`${API_URL}/blogPosts/${blogPostId}`, { mode: 'cors' })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to find blog post: ${response.status}`)
  }
  return response.json()
}

async function getAllCommentsForPost(blogPostId) {
  const response = await fetch(`${API_URL}/comments/${blogPostId}`, { mode: 'cors' })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to find comments for blog post: ${response.status}`)
  }
  return response.json()
}

async function createBlogPost(title, content, published) {
  const response = await fetch(`${API_URL}/blogPosts/newPost`, {
    mode: 'cors',
    method: 'POST',
    headers: userHeader(),
    body: JSON.stringify({ title, content, published: Boolean(published) })
  })
  if(!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to create blog post: ${response.status}`)
  }
  return response.json()
}

async function editBlogPost(title, content, published, blogPostId) {
  const response = await fetch(`${API_URL}/blogPosts/${blogPostId}`, {
    mode: 'cors',
    method: 'PUT',
    headers: userHeader(),
    body: JSON.stringify({ title, content, published: Boolean(published) })
  })
  if(!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to update blog post: ${response.status}`)
  }
  return response.json()
}

async function publishBlogPost(published, blogPostId) {
  const response = await fetch(`${API_URL}/blogPosts/${blogPostId}`, {
    mode: 'cors',
    method: 'PATCH',
    headers: userHeader(),
    body: JSON.stringify({ published: Boolean(published) })
  })
  if(!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to update blog post published status: ${response.status}`)
  }
  return response.json()
}

async function deleteBlogPost(blogPostId) {
  const response = await fetch(`${API_URL}/blogPosts/${blogPostId}`, {
    mode: 'cors',
    method: 'DELETE',
    headers: userHeader()
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to delete blog post: ${response.status}`)
  }
  return response.status === 204 ? {} : response.json()
}

export {
  login,
  getAllBlogPosts,
  getBlogPost,
  getAllCommentsForPost,
  createBlogPost,
  editBlogPost,
  publishBlogPost,
  deleteBlogPost
}
