const express = require('express')
// const cors = require('cors')
const app = express()

// For reference:
// https://github.com/stef44n/blog-api-monorepo/tree/main
// https://github.com/CassiusMercellus/TOP-blog-API/tree/master
// https://github.com/JJcode404/blog-post-api/tree/main

const userRouter = require('./routes/userRouter')
const blogPostRouter = require('./routes/blogPostRouter')
const commentRouter = require('./routes/commentRouter')

// App middleware

// Use cors to access API from webpage (or different place that is NOT secure)
// app.use(cors())

app.use(express.json())

// Used for POST and PUT requests only
app.use(express.urlencoded({ extended: true }))

app.use('/', userRouter)
app.use('/blogPost', blogPostRouter)
app.use('/comment', commentRouter)

// Normally at end - but can sit anywhere
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`File uploader app - listening on port ${process.env.PORT}`)
})
