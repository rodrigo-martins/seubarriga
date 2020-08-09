const express = require('express')
const router = express.Router()

const { select, insert } = require('../controllers/users')

router.get('/', select)
router.post('/', insert)

module.exports = router
