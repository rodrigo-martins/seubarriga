const database = require('../database/connection')
const ThrowError = require('../errors/ThrowError')

const insert = async (user) => {
  const userDB = await select({ email: user.email })
  if (userDB && userDB.length) throw new ThrowError('users-insert-not-unique-email')
  const row = await database('users').insert(user, ['id', 'name', 'email'])
  return row[0]
}

const select = async (filter = {}) => await database('users').where(filter).select(['id', 'name', 'email'])

const selectFirst = async (filter) => await database('users').where(filter).first()

module.exports = { select, insert, selectFirst }
