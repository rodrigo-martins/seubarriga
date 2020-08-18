const Accounts = require('../models/accounts')
const ThrowError = require('../errors/ThrowError')

const select = async (_req, res, next) => {
  try {
    const accounts = await Accounts.select()
    res.status(200).json(accounts)
  } catch (error) {
    next(error)
  }
}

const selectById = async (req, res, next) => {
  try {
    const { id } = req.params
    const accounts = await Accounts.select({ id })
    if (!accounts.length) throw new ThrowError('accounts-select-by-id-not-found')
    res.status(200).json(accounts[0])
  } catch (error) {
    next(error)
  }
}

const insert = async (req, res, next) => {
  try {
    const accounts = await Accounts.insert(req.body)
    res.status(201).json(accounts)
  } catch (error) {
    next(error)
  }
}

module.exports = { select, selectById, insert }
