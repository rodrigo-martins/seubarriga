const database = require('../database/connection')

const insert = async (account) => {
  if (!account.name) throw String('accounts-insert-not-name')
  if (!account.user_id) throw String('accounts-insert-not-user_id')
  const row = await database('accounts').insert(account, '*')
  return row[0]
}

const select = async (filter = {}) => await database('accounts').where(filter).select()

module.exports = { select, insert }
