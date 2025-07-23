const { Router } = require('express')
const userRouter = Router()
const userController = require('../controllers/userController')
const { authenticate } = require('../authentication/jwtAuthenticate')

userRouter.post('/signup', userController.signup)
userRouter.post('/login', userController.login)
userRouter.patch('/beAuthor', authenticate, userController.becomeAuthor)

module.exports = userRouter
