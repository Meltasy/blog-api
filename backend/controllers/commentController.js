// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()
// const bcryptjs = require('bcryptjs')

const getCommentHome = function(req, res) {
  res.json({
    message: 'Comment: Is this working?'
  })
}

const postCommentHome = function(req, res) {
  res.json({
    message: 'Comment: Post created ...'
  })
}

module.exports = {
  getCommentHome,
  postCommentHome
}
