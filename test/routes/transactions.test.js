const request = require('supertest')
const jwt = require('jwt-simple')

const app = require('../../src/app')
const database = require('../../src/database/connection')
const config = require('../../config.json')

const MAIN_ROUTE = '/transactions'
let user1, user2, accountUser1, accountUser2

beforeAll(async () => {
  await database('transactions').del()
  await database('accounts').del()
  await database('users').del();
  [user1, user2] = await database('users').insert([
    { name: 'User #1', email: 'user1@email.com', password: '' },
    { name: 'User #2', email: 'user2@email.com', password: '' }
  ], '*')
  delete user1.password
  delete user2.password
  user1.token = jwt.encode(user1, config.secret)
  user2.token = jwt.encode(user2, config.secret);
  [accountUser1, accountUser2] = await database('accounts').insert([
    { name: 'Acc User #1', user_id: user1.id },
    { name: 'Acc User #2', user_id: user2.id }
  ], '*')
})

test('transactions-select', async () => {
  const t1 = { description: 'T1', date: new Date(), type: 'I', amount: 100, acc_id: accountUser1.id }
  const t2 = { description: 'T2', date: new Date(), type: 'O', amount: 200, acc_id: accountUser2.id }
  await database('transactions').insert([t1, t2])
  const res = await request(app)
    .get(`${MAIN_ROUTE}`)
    .set('authorization', `Bearer ${user1.token}`)
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
  expect(res.body[0].description).toBe(t1.description)
})

test('transactions-insert', async () => {
  const t1 = { description: 'T1', date: new Date(), type: 'I', amount: 100, acc_id: accountUser1.id }
  const res = await request(app)
    .post(`${MAIN_ROUTE}`)
    .send(t1)
    .set('authorization', `Bearer ${user1.token}`)
  expect(res.status).toBe(200)
  expect(res.body).toHaveProperty('id')
  expect(res.body.acc_id).toBe(t1.acc_id)
})

test('transactions-select-by-id', async () => {
  const t1 = { description: 'T1', date: new Date(), type: 'I', amount: 100, acc_id: accountUser1.id }
  const transaction = await request(app)
    .post(`${MAIN_ROUTE}`)
    .send(t1)
    .set('authorization', `Bearer ${user1.token}`)
  const res = await request(app)
    .get(`${MAIN_ROUTE}/${transaction.body.id}`)
    .set('authorization', `Bearer ${user1.token}`)
  expect(res.status).toBe(200)
  expect(res.body.id).toBe(transaction.body.id)
})

test('transactions-update-by-id', async () => {
  const t1 = { description: 'T1 Update', date: new Date(), type: 'I', amount: 100, acc_id: accountUser1.id }
  const transaction = await request(app)
    .post(`${MAIN_ROUTE}`)
    .send(t1)
    .set('authorization', `Bearer ${user1.token}`)
  const t2 = { description: 'T1 Updated', amount: 200 }
  const res = await request(app)
    .put(`${MAIN_ROUTE}/${transaction.body.id}`)
    .send(t2)
    .set('authorization', `Bearer ${user1.token}`)
  expect(res.status).toBe(200)
  expect(res.body.description).toBe(t2.description)
  expect(res.body.amount).toBe(t2.amount.toFixed(2))
})

test('transactions-delete-by-id', async () => {
  const t1 = { description: 'T1 Update', date: new Date(), type: 'I', amount: 100, acc_id: accountUser1.id }
  const transaction = await request(app)
    .post(`${MAIN_ROUTE}`)
    .send(t1)
    .set('authorization', `Bearer ${user1.token}`)
  const res = await request(app)
    .delete(`${MAIN_ROUTE}/${transaction.body.id}`)
    .set('authorization', `Bearer ${user1.token}`)
  expect(res.status).toBe(204)
})

test('transactions-delele-by-id-not-user-owner', async () => {
  const t1 = { description: 'transactions-delele-by-id-not-user-owner', date: new Date(), type: 'I', amount: 100, acc_id: accountUser2.id }
  const transaction = await request(app)
    .post(`${MAIN_ROUTE}`)
    .send(t1)
    .set('authorization', `Bearer ${user1.token}`)
  const res = await request(app)
    .delete(`${MAIN_ROUTE}/${transaction.body.id}`)
    .set('authorization', `Bearer ${user1.token}`)
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('transactions-not-user-owner')
})
