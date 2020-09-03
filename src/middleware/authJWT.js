const { decode } = require('jwt-simple')
const config = require('../../config.json')

const getToken = (req) => {
  if (!req.headers.authorization) return null
  const authorization = req.headers.authorization.split(' ')
  if (authorization[0] !== 'Bearer') return null
  return authorization[1]
}

const authJWT = (req, res, next) => {
  try {
    const token = getToken(req)
    const decoded = decode(token, config.secret)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).send('Unauthorized')
  }
}

module.exports = authJWT
