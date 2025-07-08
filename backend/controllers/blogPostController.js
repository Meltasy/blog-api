const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllBlogPosts = async (req, res) => {
  try {
    const allBlogPosts = await prisma.post.findMany({
      where: { published: true },
      include: { author: true, comments: true }
    })
    if (allBlogPosts.length === 0) {
      return res.status(404).json({ error: 'No published blog posts found.'})
    }
    res.status(200).json(allBlogPosts)
  } catch (err) {
    console.error('Error finding published blog posts.', err)
    res.status(500).json({ error: 'Database error occurred.' })
  }
}

const getBlogPost = async (req, res) => {
  const blogPostId = req.params.id
  try {
    const blogPost = await prisma.post.findUnique({
      where: { id: blogPostId },
      include: { author: true, comments: true }
    })
    if (!blogPost) {
      return res.status(404).json({ error: 'No blog post found.'})
    }
    res.status(200).json(blogPost)
  } catch (err) {
    console.error('Error finding blog post.', err)
    res.status(500).json({ error: 'Database error occurred.' })
  }
}

const createBlogPost = async (req, res) => {
  const { title, content, published } = req.body
  const authorId = req.user.id
  try {
    const blogPost = await prisma.post.create({
      data: { title, content, published, authorId }
    })
    res.status(201).json(blogPost)
  } catch (err) {
    console.error('Error creating new blog post:', err)
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'This title already exsists.' })
    }
    res.status(500).json({ error: 'Failed to create blog post.' })
  }
}

const updateBlogPost = async (req, res) => {
  const blogPostId = req.params.id
  const { title, content, published } = req.body
  try {
    const blogPost = await prisma.post.update({
      where: { id: blogPostId },
      data: { title, content, published }
    })
    res.status(200).json(blogPost)
  } catch (err) {
    console.error('Error updating blog post:', err)
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'This title already exsists.' })
    }
    res.status(500).json({ error: 'Failed to update blog post.' })
  }
}

const deleteBlogPost = async (req, res) => {
  const blogPostId = req.params.id
  try {
    const blogPost = await prisma.post.delete({
      where: { id: blogPostId }
    })
    res.status(204).json(blogPost)
  } catch (err) {
    console.error('Error deleting blog post:', err)
    res.status(500).json({ error: 'Failed to delete blog post.'})
  }
}

module.exports = {
  getAllBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
}
