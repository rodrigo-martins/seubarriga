const Transactions = require('../models/transactions')

const selectByUserId = async (req, res, next) => {
  try {
    const { id } = req.user
    const accounts = await Transactions.selectByUserId(id)
    res.status(200).json(accounts)
  } catch (error) {
    next(error)
  }
}

module.exports = { selectByUserId }
