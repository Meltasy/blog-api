const API_URL = import.meta.env.VITE_API_URL

const authHeader = () => ({
  'Content-type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`
})

// Need to check if this is the cleanest way to write this ... use a try / catch block?

export async function getAllBlogPosts() {
    const response = await fetch(`${API_URL}/blogPosts`)
    if (!response.ok) {
      throw new Error('Failed to find published blog posts.')
    }
    console.log(response)
    return response.json()
}
