const express = require('express')
const router = express.Router()

const authJWT = require('../middleware/authJWT')
const { select, selectById, insert } = require('../controllers/users')

router.all('*', authJWT)
router.get('/', select)
router.get('/:id', selectById)
router.post('/', insert)

module.exports = router
