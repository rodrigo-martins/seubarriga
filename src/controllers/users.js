const bcrypt = require('bcrypt-nodejs')
const User = require('../models/users')
const ThrowError = require('../errors/ThrowError')
const select = async (_req, res, next) => {
  try {
    const users = await User.select()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

const selectFirst = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.selectFirst({ id })
    console.log(user)
    if (!user) throw new ThrowError('users-select-first-not-found')
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const insert = async (req, res, next) => {
  try {
    let user = { ...req.body }

    if (!user.name) throw new ThrowError('users-insert-not-name')
    if (!user.email) throw new ThrowError('users-insert-not-email')
    if (!user.password) throw new ThrowError('users-insert-not-password')

    user.password = getPasswordHash(user.password)
    user = await User.insert(user)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}
const getPasswordHash = (password) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

module.exports = { insert, select, selectFirst }
