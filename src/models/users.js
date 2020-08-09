const database = require('../database/connection')

const insert = async (user) => {
  if (!user.name) throw String('insert-user-not-name')
  if (!user.email) throw String('insert-user-not-email')
  if (!user.password) throw String('insert-user-not-password')

  const userDB = await select({ email: user.email })
  if (userDB && userDB.length) throw String('insert-users-not-unique-email')
  const row = await database('users').insert(user, '*')
  return row[0]
}

const select = async (filter = {}) => await database('users').where(filter).select()

module.exports = { select, insert }
