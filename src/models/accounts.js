const database = require('../database/connection')
const ThrowError = require('../errors/ThrowError')

const insert = async (account) => {
  if (!account.name) throw new ThrowError('accounts-insert-not-name')
  if (!account.user_id) throw new ThrowError('accounts-insert-not-user_id')
  const row = await database('accounts').insert(account, '*')
  return row[0]
}

const update = async (filter, account) => {
  if (!account.name) throw new ThrowError('accounts-update-not-name')
  const row = await database('accounts').update(account, '*').where(filter)
  return row[0]
}

const select = async (filter = {}) => await database('accounts').where(filter).select()

const del = async (filter) => await database('accounts').where(filter).del()

module.exports = { select, insert, update, del }
