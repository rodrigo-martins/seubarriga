const database = require('../database/connection')

const selectByUserId = async (userId, filter = {}) => await database('transactions')
  .join('accounts', 'accounts.id', 'acc_id')
  .where(filter)
  .andWhere('accounts.user_id', userId)
  .select()

const select = async (filter = {}) => await database('transactions')
  .where(filter)
  .select()

const insert = async (transaction) => await database('transactions').insert(transaction, '*')

const update = async (filter, transaction) => await database('transactions')
  .where(filter)
  .update(transaction, '*')

const del = async (filter) => await database('transactions').where(filter).del()

module.exports = { selectByUserId, insert, select, update, del }
