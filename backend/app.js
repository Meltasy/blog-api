const express = require('express')
const app = express()
const CustomError = require('./errors/CustomError')

const userRouter = require('./routes/userRouter')
const blogPostRouter = require('./routes/blogPostRouter')
const commentRouter = require('./routes/commentRouter')

// Used for POST and PUT requests only
app.use(express.urlencoded({ extended: true }))

// App middleware

// Express session?

// User available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

app.use('/', userRouter)
app.use('/blogPost', blogPostRouter)
app.use('/comment', commentRouter)

// Catches any final errors - must be at end
app.use((req, res, next) => {
  next(new CustomError('Page not found.', 404))
})

app.use((err, req, res, next) => {
  console.error(err)
  if (err instanceof CustomError) {
    return res.status(err.statusCode).render('error', {
      message: err.message,
      error: process.env.NODE_ENV === 'development' ? err : null
    })
  }
  res.status(err.statusCode || 500).render('error', {
    message: err.message || 'Something broke!',
    error: process.env.NODE_ENV === 'development' ? err : null
  })
})

// Normally at end - but can sit anywhere
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`File uploader app - listening on port ${process.env.PORT}`)
})
