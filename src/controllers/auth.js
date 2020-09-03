const bcrypt = require('bcrypt-nodejs')
const User = require('../models/users')
const jwt = require('jwt-simple')

const ThrowError = require('../errors/ThrowError')
const config = require('../../config.json')

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.selectFirst({ email })
    if (!user) throw new ThrowError('auth-signin-not-email/password')
    if (bcrypt.compareSync(password, user.password)) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email
      }
      const token = jwt.encode(payload, config.secret)
      res.status(200).json({ token })
    }
    throw new ThrowError('auth-signin-not-email/password')
  } catch (error) {
    next(error)
  }
}

module.exports = { signIn }
