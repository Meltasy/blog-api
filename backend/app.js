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

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running successfully!'})
})

app.use('/view', express.static(path.join(__dirname, '../frontend-view/dist')))
app.use('/author', express.static(path.join(__dirname, '../frontend-author/dist')))

// Only use in production
// app.get('/view/*', (req, res) => {
//   res.sendFile(path.join(__dirname, './frontend-view/dist', 'index.html'))
// })
// app.get('/author/*', (req, res) => {
//   res.sendFile(path.join(__dirname, './frontend-author/dist', 'index.html'))
// })

// Normally at end - but can sit anywhere
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`File uploader app - listening on port ${process.env.PORT}`)
})
