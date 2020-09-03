const port = 3000
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// Middlewares
app.use(bodyParser.json())
app.use(cors())

// Routes Modules
const routes = require('./routes')
app.use('/', routes)

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
