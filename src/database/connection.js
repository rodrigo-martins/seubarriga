const knex = require('knex')
const knexfile = require('./config')
const database = knex(knexfile.test)
module.exports = database
