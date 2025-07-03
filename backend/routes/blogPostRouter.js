const { Router } = require('express')
const blogPostRouter = Router()
const blogPostController = require('../controllers/blogPostController')

blogPostRouter.get('/', blogPostController.getBlogPostHome)
blogPostRouter.post('/', blogPostController.postBlogPostHome)

module.exports = blogPostRouter
