const API_URL = import.meta.env.VITE_API_URL

const header = () => ({
  'Content-type': 'application/json'
})

const authHeader = () => ({
  'Content-type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`
})

// Use Promise.all to e.g. fetch blogPosts and comments at the same time

export async function signup(username, email, password) {
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

export async function getAllBlogPosts() {
    const response = await fetch(`${API_URL}/blogPosts`, { mode: 'cors' })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Failed to find published blog posts: ${response.status}`)
    }
    console.log(response)
    return response.json()
}

export async function addComment() {
  const response = await fetch(`${API_URL}/comments`, {
    mode: 'cors',
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ content, blogPostId })
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to post comment: ${response.status}`)
  }
  console.log(response)
  return response.json()
}
