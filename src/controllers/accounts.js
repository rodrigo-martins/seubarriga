const Accounts = require('../models/accounts')

const select = async (_req, res) => {
  try {
    const accounts = await Accounts.select()
    res.status(200).json(accounts)
  } catch (error) {
    res.status(400).json({ code: error })
  }
}

const selectById = async (req, res) => {
  try {
    const { id } = req.params
    const accounts = await Accounts.select({ id })
    if (!accounts.length) throw String('accounts-select-by-id-not-found')
    res.status(200).json(accounts[0])
  } catch (error) {
    res.status(400).json({ code: error })
  }
}

const insert = async (req, res) => {
  try {
    const accounts = await Accounts.insert(req.body)
    res.status(201).json(accounts)
  } catch (error) {
    res.status(400).json({ code: error })
  }
}

module.exports = { select, selectById, insert }
