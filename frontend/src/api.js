import { getUserHeader } from './utils/authenticate'

const API_URL = import.meta.env.VITE_API_URL

const header = () => ({
  'Content-type': 'application/json'
})

const userHeader = () => ({
  ...header(),
  ...getUserHeader()
})

async function signup(username, email, password) {
  const response = await fetch(`${API_URL}/signup`, {
    mode: 'cors',
    method: 'POST',
    headers: header(),
    body: JSON.stringify({ username, email, password })
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to sign up: ${response.status}`)
  }
  console.log(response)
  return response.json()
}

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
  console.log(response)
  return response.json()
}

async function becomeAuthor() {
  const response = await fetch(`${API_URL}/author`, {
    mode: 'cors',
    method: 'PATCH',
    headers: userHeader()
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to become author: ${response.status}`)
  }
  console.log(response)
  return response.json()
}

async function getAllBlogPosts() {
    const response = await fetch(`${API_URL}/blogPosts`, { mode: 'cors' })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Failed to find published blog posts: ${response.status}`)
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

async function getAllCommentsForPost(blogPostId) {
  const response = await fetch(`${API_URL}/comments/${blogPostId}`, { mode: 'cors' })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to find comments for blog post ${blogPostId}: ${response.status}`)
  }
  console.log(response)
  return response.json()
}

async function createComment(content, blogPostId) {
  const response = await fetch(`${API_URL}/comments`, {
    mode: 'cors',
    method: 'POST',
    headers: userHeader(),
    body: JSON.stringify({ content, blogPostId })
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to post comment: ${response.status}`)
  }
  console.log(response)
  return response.json()
}

async function updateComment(commentId, content) {
  const response = await fetch(`${API_URL}/comments/${commentId}`, {
    mode: 'cors',
    method: 'PUT',
    headers: userHeader(),
    body: JSON.stringify({ content })
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to update comment: ${response.status}`)
  }
  console.log(response)
  return response.json()
}

async function deleteComment(commentId) {
  const response = await fetch(`${API_URL}/comments/${commentId}`, {
    mode: 'cors',
    method: 'DELETE',
    headers: userHeader()
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to delete comment: ${response.status}`)
  }
  console.log(response)
  return response.status === 204 ? {} : response.json()
}

export {
  signup,
  login,
  becomeAuthor,
  getAllBlogPosts,
  getBlogPost,
  getAllCommentsForPost,
  createComment,
  updateComment,
  deleteComment
}
