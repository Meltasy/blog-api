const { Router } = require('express')
const commentRouter = Router()
const commentController = require('../controllers/commentController')
const { authenticate } = require('../authentication/jwtAuthenticate')

commentRouter.get('/blogPost/:postId', commentController.getAllCommentsForPost)
commentRouter.post('/', authenticate, commentController.createComment)
commentRouter.put('/:id', authenticate, commentController.updateComment)
commentRouter.delete('/:id', authenticate, commentController.deleteComment)

module.exports = commentRouter
