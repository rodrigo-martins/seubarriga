const express = require('express')
const router = express.Router()

const { selectByUserId } = require('../controllers/transactions')

// Routes
router.get('/', selectByUserId)

module.exports = router
