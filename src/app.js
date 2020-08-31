const port = 3000
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Middlewares
app.use(bodyParser.json())

// Routes Modules
const auth = require('./routes/auth')
const users = require('./routes/users')
const accounts = require('./routes/accounts')

// Routes
app.get('/', (_req, res) => { res.send('Seu Barriga API') })
app.use('/auth', auth)
app.use('/users', users)
app.use('/accounts', accounts)

// Errors
app.use((error, _req, res, next) => {
  const { name, code, message } = error
  if (name === 'ThrowError') {
    res.status(400).json({ code, message })
  } else {
    res.status(500).send(error)
  }
  next(error)
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => { console.log(`Running http://localhost:${port}`) })
}

module.exports = app
