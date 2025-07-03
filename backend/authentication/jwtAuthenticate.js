function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  } else {
    // res.sendStatus(403)
    res.json({
      message: '403 error: Forbidden - bearerHeader not authorized'
    })
  }
}

module.exports = { verifyToken }
