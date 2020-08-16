const port = 3002
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Middlewares
app.use(bodyParser.json())

// Routes Modules
const users = require('./routes/users')
const accounts = require('./routes/accounts')

// Routes
app.get('/', (_req, res) => { res.send('Seu Barriga API') })
app.use('/users', users)
app.use('/accounts', accounts)

app.listen(port, () => { console.log(`Running http://localhost:${port}`) })

module.exports = app
