const express = require('express')
const router = express.Router()

const { select, insert, selectFirst } = require('../controllers/users')

router.get('/', select)
router.get('/:id', selectFirst)
router.post('/', insert)

module.exports = router
