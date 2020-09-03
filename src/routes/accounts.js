const express = require('express')
const router = express.Router()

const { select, insert, selectById } = require('../controllers/accounts')

router.get('/', select)
router.get('/:id', selectById)
router.post('/', insert)

module.exports = router
