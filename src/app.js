const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const knex = require('knex')
const knexfile = require('../knexfile')

app.use(bodyParser.json())
app.use(function (req, res, next) {
  req.locals = {
    db: knex(knexfile.test)
  }
  next()
})

const users = require('./routes/users')
app.use('/users', users)

module.exports = app
