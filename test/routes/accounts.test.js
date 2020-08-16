const request = require('supertest')
const app = require('../../src/app')
const database = require('../../src/database/connection')
const User = require('../../src/models/users')

const MAIN_ROUTE = '/accounts'
let user

beforeAll(async () => {
  user = await User.insert({
    name: 'User Account Test',
    email: `${Date.now()}@email.com`,
    password: '123456'
  })
})

test('accounts-insert', async () => {
  const account = { name: '#Acc 1', user_id: user.id }
  const res = await request(app).post(MAIN_ROUTE).send(account)
  expect(res.status).toBe(201)
  expect(res.body.name).toEqual(account.name)
})

test('accounts-select', async () => {
  const account = { name: '#Acc 1', user_id: user.id }
  await database('accounts').insert(account)
  const res = await request(app).get(MAIN_ROUTE)
  expect(res.status).toBe(200)
  expect(res.body.length).toBeGreaterThan(0)
})

test('accounts-insert-not-name', async () => {
  const account = { user_id: user.id }
  const res = await request(app).post(MAIN_ROUTE).send(account)
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('accounts-insert-not-name')
})

test('accounts-insert-not-user_id', async () => {
  const account = { name: '#Acc 1' }
  const res = await request(app).post(MAIN_ROUTE).send(account)
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('accounts-insert-not-user_id')
})

test('accounts-select-by-id', async () => {
  const account = { name: '#Acc 1', user_id: user.id }
  const newAccount = await database('accounts').insert(account, '*')
  const res = await request(app).get(`${MAIN_ROUTE}/${newAccount[0].id}`)
  expect(res.status).toBe(200)
  expect(res.body.name).toEqual(account.name)
  expect(res.body.user_id).toEqual(account.user_id)
})

test('accounts-select-by-id-not-found', async () => {
  const account = { name: '#Acc 1', user_id: user.id }
  const newAccount = await database('accounts').insert(account, '*')
  await database('accounts').where('id', newAccount[0].id).del()
  const res = await request(app).get(`${MAIN_ROUTE}/${newAccount[0].id}`)
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('accounts-select-by-id-not-found')
})
