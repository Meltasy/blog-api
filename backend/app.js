const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

const userRouter = require('./routes/userRouter')
const blogPostRouter = require('./routes/blogPostRouter')
const commentRouter = require('./routes/commentRouter')

// App middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API routes
app.use('/', userRouter)
app.use('/blogPosts', blogPostRouter)
app.use('/comments', commentRouter)

// Normally at end - but can sit anywhere
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`File uploader app - listening on port ${process.env.PORT}`)
})
