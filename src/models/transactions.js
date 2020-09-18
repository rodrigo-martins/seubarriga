const database = require('../database/connection')

const selectByUserId = async (userId, filter = {}) => await database('transactions')
  .join('accounts', 'accounts.id', 'acc_id')
  .where(filter)
  .andWhere('accounts.user_id', userId)
  .select()

module.exports = { selectByUserId }
