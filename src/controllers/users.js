const User = require('../models/users')

const select = async (_req, res, next) => {
  try {
    const users = await User.select()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

const insert = async (req, res, next) => {
  try {
    const user = await User.insert(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

module.exports = { insert, select }
