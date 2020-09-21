const Transactions = require('../models/transactions')
const ThrowError = require('../errors/ThrowError')

const selectByUserId = async (req, res, next) => {
  try {
    const { id } = req.user
    const accounts = await Transactions.selectByUserId(id)
    res.status(200).json(accounts)
  } catch (error) {
    next(error)
  }
}

const insert = async (req, res, next) => {
  try {
    const { body } = req
    const transaction = await Transactions.insert(body)
    res.status(200).json(transaction[0])
  } catch (error) {
    next(error)
  }
}

const selectById = async (req, res, next) => {
  try {
    const { id } = req.params
    const account = await Transactions.select({ id })
    res.status(200).json(account[0])
  } catch (error) {
    next(error)
  }
}

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const transaction = await Transactions.update({ id }, body)
    res.status(200).json(transaction[0])
  } catch (error) {
    next(error)
  }
}

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params
    const transaction = await Transactions.del({ id })
    res.status(204).json({ transaction })
  } catch (error) {
    next(error)
  }
}

const owner = async (req, res, next) => {
  try {
    const { id: userId } = req.user
    const { id } = req.params
    const transaction = await Transactions.selectByUserId(userId, { 'transactions.id': id })
    if (!transaction.length) throw new ThrowError('transactions-not-user-owner')
    else next()
  } catch (error) {
    next(error)
  }
}

module.exports = { selectByUserId, insert, selectById, updateById, deleteById, owner }
