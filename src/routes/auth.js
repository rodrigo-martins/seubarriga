const express = require('express')
const router = express.Router()

const { signIn } = require('../controllers/auth')
const { insert } = require('../controllers/users')

router.post('/signin', signIn)
router.post('/signup', insert)

module.exports = router
