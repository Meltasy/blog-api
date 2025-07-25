const { Router } = require('express')
const blogPostRouter = Router()
const blogPostController = require('../controllers/blogPostController')
const { authenticate, authorizeRole } = require('../authentication/jwtAuthenticate')

blogPostRouter.get('/', blogPostController.getAllBlogPosts)
blogPostRouter.get('/:id', blogPostController.getBlogPost)
blogPostRouter.post('/newPost', authenticate, authorizeRole, blogPostController.createBlogPost)
blogPostRouter.put('/:id', authenticate, authorizeRole, blogPostController.updateBlogPost)
blogPostRouter.delete('/:id', authenticate, authorizeRole, blogPostController.deleteBlogPost)

module.exports = blogPostRouter
