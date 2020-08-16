const database = require('../database/connection')

const insert = async (user) => {
  if (!user.name) throw String('users-insert-not-name')
  if (!user.email) throw String('users-insert-not-email')
  if (!user.password) throw String('users-insert-not-password')

  const userDB = await select({ email: user.email })
  if (userDB && userDB.length) throw String('users-insert-not-unique-email')
  const row = await database('users').insert(user, '*')
  return row[0]
}

const select = async (filter = {}) => await database('users').where(filter).select()

module.exports = { select, insert }
