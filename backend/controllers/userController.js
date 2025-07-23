const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcryptjs = require('bcryptjs')

const signup = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const hashPword = await bcryptjs.hash(password, 10)
    const user = await prisma.user.create({
      data: { username, email, password: hashPword }
    })
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    res.status(201).json({
      token,
      user: { id: user.id, username: user.username }
    })
  } catch (err) {
    console.error('Error adding new user:', err)
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'This username or email already exsists.' })
    }
    res.status(500).json({ error: 'Failed to create user.' })
  }
}

const login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await prisma.user.findUnique({
      where: { username }
    })
    if (!user) {
      return res.status(401).json({ error: 'The username is incorrect.' })
    }
    const match = await bcryptjs.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ error: 'The password is incorrect.' })
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role }
    })
  } catch (err) {
    console.error('Error loggin in:', err)
    res.status(500).json({ error: 'Login failed.' })
  }
}

const becomeAuthor = async (req, res) => {
  const { passcode } = req.body
  if (!passcode || passcode !== process.env.AUTHOR_PASSCODE) {
    return res.status(403).json({ error: 'The passcode is incorrect.' })
  }
  const userId = req.user.id
  try {
    const author = await prisma.user.update({
      where: { id: userId },
      data: { role: 'AUTHOR' }
    })
    const newToken = jwt.sign(
      { id: author.id, username: author.username, email: author.email, role: author.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    res.status(200).json({
      token: newToken,
      user: { id: author.id, username: author.username, role: author.role }
    })
  } catch (err) {
    console.error('Error changing user role.', err)
    res.status(500).json({ error: 'Failed to change user role.'})
  }
}

module.exports = {
  signup,
  login,
  becomeAuthor
}
