const database = require('../database/connection')
const ThrowError = require('../errors/ThrowError')

const insert = async (account) => {
  if (!account.name) throw new ThrowError('accounts-insert-not-name')
  if (!account.user_id) throw new ThrowError('accounts-insert-not-user_id')
  const row = await database('accounts').insert(account, '*')
  return row[0]
}

const select = async (filter = {}) => await database('accounts').where(filter).select()

module.exports = { select, insert }
