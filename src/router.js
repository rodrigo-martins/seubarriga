const express = require('express')
const router = express.Router()
const authJWT = require('./middleware/authJWT')

// Routes Modules
const auth = require('./routes/auth')
const users = require('./routes/users')
const accounts = require('./routes/accounts')

// Routes
router.get('/', (_req, res) => { res.send('Seu Barriga API') })
router.use('/auth', auth)
router.use('/users', authJWT, users)
router.use('/accounts', authJWT, accounts)

module.exports = router
