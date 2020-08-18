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

// Errors
app.use((error, _req, res, next) => {
  const { name, code, message } = error
  if (name === 'Throw Error') {
    res.status(400).json({ code, message })
  } else {
    res.status(500).send(error)
  }
  next(error)
})
app.listen(port, () => { console.log(`Running http://localhost:${port}`) })

module.exports = app
