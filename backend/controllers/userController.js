const jwt = require('jsonwebtoken')
// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()
// const bcryptjs = require('bcryptjs')

const getUserHome = function(req, res) {
  res.json({
    message: 'User: Is this working?'
  })
}

// JWT can be done synchronously or asynchronously
const loginUser = function(req, res) {
  const user = {
    id: 1,
    username: 'Brad Pitt',
    email: 'b.pitt@gmail.com'
  }
  // Because {user: user} is the same, you can just do {user}
  jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: '30s' }, (err, token) => {
    res.json({
      token
    })
  })
}

const createPost = function(req, res) {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if(err) {
      res.sendStatus(403)
      // res.json({
      //   message: '403 error: Forbidden - bearerHeader not authorized'
      // })
    } else {
      res.json({
        message: 'User: Post created ...',
        authData
      })
    }
  })
}

module.exports = {
  getUserHome,
  loginUser,
  createPost
}
