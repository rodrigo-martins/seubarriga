const port = 3002
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Middlewares
app.use(bodyParser.json())

// Routes Modules
const users = require('./routes/users')

// Routes
app.get('/', (_req, res) => { res.send('Seu Barriga API') })
app.use('/users', users)

app.listen(port, () => { console.log(`Running http://localhost:${port}`) })

module.exports = app
