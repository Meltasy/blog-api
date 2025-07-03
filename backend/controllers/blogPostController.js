// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()
// const bcryptjs = require('bcryptjs')

const getBlogPostHome = function(req, res) {
  res.json({
    message: 'BlogPost: Is this working?'
  })
}

const postBlogPostHome = function(req, res) {
  res.json({
    message: 'BlogPost: Post created ...'
  })
}

module.exports = {
  getBlogPostHome,
  postBlogPostHome
}
