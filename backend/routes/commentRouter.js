const { Router } = require('express')
const commentRouter = Router()
const commentController = require('../controllers/commentController')

commentRouter.get('/', commentController.getCommentHome)
commentRouter.post('/', commentController.postCommentHome)

module.exports = commentRouter
