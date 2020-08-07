const express = require('express')
const router = express.Router()

const { getAll } = require('../controllers/users/getAll')
const { create } = require('../controllers/users/create')

router.get('/', getAll)
router.post('/', create)

module.exports = router
