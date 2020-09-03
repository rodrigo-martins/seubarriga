const Accounts = require('../models/accounts')
const ThrowError = require('../errors/ThrowError')

const select = async (req, res, next) => {
  try {
    const { id } = req.user
    const accounts = await Accounts.select({ user_id: id })
    res.status(200).json(accounts)
  } catch (error) {
    next(error)
  }
}

const selectById = async (req, res, next) => {
  try {
    const { id } = req.params
    const { id: userId } = req.user
    const accounts = await Accounts.select({ id, user_id: userId })
    if (!accounts.length) throw new ThrowError('accounts-select-by-id-not-found')
    res.status(200).json(accounts[0])
  } catch (error) {
    next(error)
  }
}

const insert = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name || null,
      user_id: req.user.id
    }
    const accountDB = await Accounts.select(data)
    if (accountDB.length) throw new ThrowError('accounts-insert-not-same-name')

    const accounts = await Accounts.insert(data)
    res.status(201).json(accounts)
  } catch (error) {
    next(error)
  }
}

module.exports = { select, selectById, insert }
