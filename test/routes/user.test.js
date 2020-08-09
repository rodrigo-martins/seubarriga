const request = require('supertest')
const app = require('../../src/app')
const email = `${Date.now()}@email.com`

test('select-users', async () => {
  const res = await request(app).get('/users')
  expect(res.status).toBe(200)
  expect(res.body.length).toBeGreaterThanOrEqual(0)
})

test('insert-user', async () => {
  const user = { name: 'Due', email, password: '123456' }
  const res = await request(app).post('/users').send(user)
  expect(res.status).toBe(201)
  expect(res.body).toHaveProperty('id')
  expect(res.body.name).toEqual(user.name)
  expect(res.body.email).toEqual(user.email)
  expect(res.body.password).toEqual(user.password)
})

test('insert-user-not-name', async () => {
  const email = `${Date.now()}@email.com`
  const user = { email, password: '123456' }
  const res = await request(app).post('/users').send(user)
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('insert-user-not-name')
})

test('insert-user-not-email', async () => {
  const user = { name: 'John', password: '123456' }
  const res = await request(app).post('/users').send(user)
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('insert-user-not-email')
})

test('insert-user-not-password', async () => {
  const user = { name: 'John', email: 'email@email.com' }
  const res = await request(app).post('/users').send(user)
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('insert-user-not-password')
})

test('insert-users-not-unique-email', async () => {
  const user = { name: 'Due', email, password: '123456' }
  const res = await request(app).post('/users').send(user)
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('insert-users-not-unique-email')
})
