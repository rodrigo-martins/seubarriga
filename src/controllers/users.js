const User = require('../models/users')

const select = async (_req, res) => {
  try {
    const users = await User.select()
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ code: error })
  }
}

const insert = async (req, res) => {
  try {
    const user = await User.insert(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ code: error })
  }
}

module.exports = { select, insert }
