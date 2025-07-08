const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing authorization header.' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    // Do I need to store the token for future use? Will this be needed on the front end / api?
    // req.token = token
    next()
  } catch (err) {
    console.error('Invalid token:', err)
    res.status(403).json({ error: 'Invalid token.' })
  }
}

const authorizeRole = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required.' })
  }
  if (req.user.role !== 'AUTHOR') {
    return res.status(403).json({ error: 'Only authors have permission' })
  }
  next()
}

module.exports = {
  authenticate,
  authorizeRole
}
