const express = require('express')
// const cors = require('cors')
const app = express()

const userRouter = require('./routes/userRouter')
const blogPostRouter = require('./routes/blogPostRouter')
const commentRouter = require('./routes/commentRouter')

// App middleware

// Use Cors and json to access API from different origins - need to look into this
// app.use(cors())
app.use(express.json())

// Used for POST and PUT requests only
app.use(express.urlencoded({ extended: true }))

// User available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

app.use('/', userRouter)
app.use('/blogPost', blogPostRouter)
app.use('/comment', commentRouter)

// Normally at end - but can sit anywhere
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`File uploader app - listening on port ${process.env.PORT}`)
})
