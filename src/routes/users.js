const express = require('express')
const router = express.Router()

const authJWT = require('../middleware/authJWT')
const { select, selectById } = require('../controllers/users')

router.all('*', authJWT)
router.get('/', select)
router.get('/:id', selectById)

module.exports = router
