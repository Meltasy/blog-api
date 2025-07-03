const { Router } = require('express')
const userRouter = Router()
const userController = require('../controllers/userController')
const { verifyToken } = require('../authentication/jwtAuthenticate')

userRouter.get('/', userController.getUserHome)
userRouter.post('/login', userController.loginUser)
userRouter.post('/post', verifyToken, userController.createPost)

module.exports = userRouter
