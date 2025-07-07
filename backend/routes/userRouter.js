const { Router } = require('express')
const userRouter = Router()
const userController = require('../controllers/userController')
const { authenticate } = require('../authentication/jwtAuthenticate')

userRouter.post('/', userController.newUser)
userRouter.post('/login', userController.login)
userRouter.patch('/author', authenticate, userController.becomeAuthor)

module.exports = userRouter
