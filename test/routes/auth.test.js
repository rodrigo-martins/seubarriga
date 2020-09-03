const request = require('supertest')
const app = require('../../src/app')
const MAIN_ROUTE = '/auth'

test('auth-signup', async () => {
  const email = `${Date.now()}@email.com`
  const user = { name: 'Due', email, password: '123456' }
  const res = await request(app).post(`${MAIN_ROUTE}/signup`).send(user)
  expect(res.status).toBe(201)
  expect(res.body).toHaveProperty('id')
  expect(res.body.name).toEqual(user.name)
  expect(res.body.email).toEqual(user.email)
  expect(res.body).not.toHaveProperty('password')
})

test('auth-signin', async () => {
  const email = `${Date.now()}@email.com`
  const userNew = { name: 'auth-signin', email, password: 'abcdef' }
  await request(app).post('/auth/signup').send(userNew)
  const res = await request(app).post(`${MAIN_ROUTE}/signin`).send(userNew)
  expect(res.status).toBe(200)
  expect(res.body).toHaveProperty('token')
})

test('auth-signin-not-password', async () => {
  const email = `${Date.now()}@email.com`
  const userNew = { name: 'auth-signin', email, password: 'abcdef' }
  await request(app).post('/users').send(userNew)
  const res = await request(app).post(`${MAIN_ROUTE}/signin`).send({ email, password: 'fedcba' })
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('auth-signin-not-email/password')
})

test('auth-signin-not-user', async () => {
  const email = `${Date.now()}@email.com`
  const res = await request(app).post(`${MAIN_ROUTE}/signin`).send({ email, password: 'fedcba' })
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('auth-signin-not-email/password')
})

test('auth-signin-not-authenticated', async () => {
  const res = await request(app).get('/users')
  expect(res.status).toBe(401)
})
