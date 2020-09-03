const request = require('supertest')

const app = require('../../src/app')
const database = require('../../src/database/connection')

const MAIN_ROUTE = '/accounts'
let user
let user2
let authorization

beforeAll(async () => {
  // User #1
  const email = `${Date.now()}@email.com`
  const password = '123456'
  const name = 'Get Token User #1'
  const signup = await request(app)
    .post('/auth/signup')
    .send({ name, email, password })
  user = signup.body
  const response = await request(app)
    .post('/auth/signin')
    .send({ email, password })
  authorization = `Bearer ${response.body.token}`

  // User #2
  const email2 = `${Date.now()}2@email.com`
  const password2 = '123456'
  const name2 = 'Get Token User #2'
  const signup2 = await request(app)
    .post('/auth/signup')
    .send({ name: name2, email: email2, password: password2 })
  user2 = signup2.body
})

test('accounts-select', async () => {
  const account = { name: '#Acc 1 test(accounts-select)', user_id: user.id }
  const account2 = { name: '#Acc 2 test(accounts-select)', user_id: user2.id }
  await database('accounts').insert([account, account2])
  const res = await request(app)
    .get(MAIN_ROUTE)
    .set('authorization', authorization)
  expect(res.status).toBe(200)
  expect(res.body.length).toBe(1)
  expect(res.body[0].name).toBe(account.name)
})

test('accounts-insert', async () => {
  const account = { name: '#Acc 1 test(accounts-insert)' }
  const res = await request(app)
    .post(MAIN_ROUTE)
    .send(account)
    .set('authorization', authorization)
  expect(res.status).toBe(201)
  expect(res.body.name).toEqual(account.name)
})

test('accounts-insert-not-name', async () => {
  const res = await request(app)
    .post(MAIN_ROUTE)
    .set('authorization', authorization)
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('accounts-insert-not-name')
})

test.skip('accounts-insert-not-user_id', async () => {
  const account = { name: '#Acc test(accounts-insert-not-user_id)' }
  const res = await request(app)
    .post(MAIN_ROUTE)
    .send(account)
    .set('authorization', authorization)
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('accounts-insert-not-user_id')
})

test('accounts-select-by-id', async () => {
  const account = { name: '#Acc test(accounts-select-by-id)', user_id: user.id }
  const newAccount = await database('accounts').insert(account, '*')
  const res = await request(app)
    .get(`${MAIN_ROUTE}/${newAccount[0].id}`)
    .set('authorization', authorization)
  expect(res.status).toBe(200)
  expect(res.body.name).toEqual(account.name)
  expect(res.body.user_id).toEqual(account.user_id)
})

test('accounts-select-by-id-not-found', async () => {
  const account = { name: '#Acc test(accounts-select-by-id-not-found)', user_id: user.id }
  const newAccount = await database('accounts').insert(account, '*')
  await database('accounts').where('id', newAccount[0].id).del()
  const res = await request(app)
    .get(`${MAIN_ROUTE}/${newAccount[0].id}`)
    .set('authorization', authorization)
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('accounts-select-by-id-not-found')
})
