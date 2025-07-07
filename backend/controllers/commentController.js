const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllCommentsForPost = async (req, res) => {
  const postId = req.params.postId
  try {
    const allComments = await prisma.comment.findMany({
      where: { blogPostId: postId },
      include: { author: true }
    })
    if (allComments.length === 0) {
      return res.status(404).json({ error: 'No comments found for this blog post.' })
    }
    res.status(200).json(allComments)
  } catch (err) {
    console.error('Error finding comments for blog post.', err)
    res.status(500).json({ error: 'Database error occurred.' })
  }
}

const createComment = async (req, res) => {
  const { content, blogPostId } = req.body
  const authorId = req.user.id
  if (!blogPostId) {
    return res.status(404).json({ error: 'No blog post found.'})
  }
  try {
    const comment = await prisma.comment.create({
      data: { content, blogPostId, authorId }
    })
    res.status(201).json(comment)
  } catch (err) {
    console.error('Error creating new comment:', err)
    res.status(500).json({ error: 'Failed to create comment.' })
  }
}

const updateComment = async (req, res) => {
  const commentId = req.params.id
  const { content, blogPostId } = req.body
  if (!blogPostId) {
    return res.status(404).json({ error: 'No blog post found.'})
  }
  try {
    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: { content, blogPostId }
    })
    res.status(200).json(comment)
  } catch (err) {
    console.error('Error updating comment:', err)
    res.status(500).json({ error: 'Failed to update comment.' })
  }
}

const deleteComment = async (req, res) => {
  const commentId = req.params.id
  try {
    const comment = await prisma.comment.delete({
      where: { id: commentId }
    })
    res.status(204).json(comment)
  } catch (err) {
    console.error('Error deleting comment:', err)
    res.status(500).json({ error: 'Failed to delete comment.' })
  }
}

module.exports = {
  getAllCommentsForPost,
  createComment,
  updateComment,
  deleteComment
}
