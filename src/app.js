const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

const users = require('./routes/users')
app.use('/users', users)

module.exports = app
