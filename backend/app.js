const express = require('express')
const cors = require('cors')
const app = express()

// For reference:
// https://github.com/stef44n/blog-api-monorepo/tree/main
// https://github.com/CassiusMercellus/TOP-blog-API/tree/master
// https://github.com/JJcode404/blog-post-api/tree/main

const userRouter = require('./routes/userRouter')
const blogPostRouter = require('./routes/blogPostRouter')
const commentRouter = require('./routes/commentRouter')

// App middleware

app.use(cors())
app.use(express.json())

// Used for POST and PUT requests only
app.use(express.urlencoded({ extended: true }))

app.use('/', userRouter)
app.use('/blogPosts', blogPostRouter)
app.use('/comments', commentRouter)

// Normally at end - but can sit anywhere
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`File uploader app - listening on port ${process.env.PORT}`)
})
