const request = require('supertest')
const app = require('../../src/app')
const MAIN_ROUTE = '/users'
const email = `${Date.now()}@email.com`

test('users-select', async () => {
  const res = await request(app).get(MAIN_ROUTE)
  expect(res.status).toBe(200)
  expect(res.body.length).toBeGreaterThanOrEqual(0)
})

test('users-insert', async () => {
  const user = { name: 'Due', email, password: '123456' }
  const res = await request(app).post(MAIN_ROUTE).send(user)
  expect(res.status).toBe(201)
  expect(res.body).toHaveProperty('id')
  user.id = res.body.id
  expect(res.body).toEqual(user)
})

test('users-insert-not-name', async () => {
  const user = { email, password: '123456' }
  const res = await request(app).post(MAIN_ROUTE).send(user)
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('users-insert-not-name')
})

test('users-insert-not-email', async () => {
  const user = { name: 'John', password: '123456' }
  const res = await request(app).post(MAIN_ROUTE).send(user)
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('users-insert-not-email')
})

test('users-insert-not-password', async () => {
  const user = { name: 'John', email: 'email@email.com' }
  const res = await request(app).post(MAIN_ROUTE).send(user)
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('users-insert-not-password')
})

test('users-insert-not-unique-email', async () => {
  const user = { name: 'Due', email, password: '123456' }
  const res = await request(app).post(MAIN_ROUTE).send(user)
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('users-insert-not-unique-email')
})
