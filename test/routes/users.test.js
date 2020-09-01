const request = require('supertest')
const app = require('../../src/app')
const database = require('../../src/database/connection')
const MAIN_ROUTE = '/users'
const email = `${Date.now()}@email.com`

test('users-select', async () => {
  const res = await request(app).get(MAIN_ROUTE)
  expect(res.status).toBe(200)
  expect(res.body).not.toHaveProperty('email')
  expect(res.body.length).toBeGreaterThanOrEqual(0)
})

test('users-select-first', async () => {
  const user = { name: 'Due', email: `${Date.now()}@email.com`, password: '123456' }
  const newUser = await database('users').insert(user, '*')
  const res = await request(app).get(`${MAIN_ROUTE}/${newUser[0].id}`)
  expect(res.status).toBe(200)
  expect(res.body).toHaveProperty('id')
  user.id = res.body.id
  expect(res.body).toEqual(user)
})

test('users-select-first-not-found', async () => {
  const user = { name: 'Due', email: `${Date.now()}@email.com`, password: '123456' }
  const newUser = await database('users').insert(user, '*')
  await database('users').where({ id: newUser[0].id }).del()
  const res = await request(app).get(`${MAIN_ROUTE}/${newUser[0].id}`)
  expect(res.status).toBe(400)
  expect(res.body.code).toBe('users-select-first-not-found')
})

test('users-insert', async () => {
  const user = { name: 'Due', email, password: '123456' }
  const res = await request(app).post(MAIN_ROUTE).send(user)
  expect(res.status).toBe(201)
  user.id = res.body.id
  expect(res.body).toHaveProperty('id')
  expect(res.body.name).toEqual(user.name)
  expect(res.body.email).toEqual(user.email)
  expect(res.body).not.toHaveProperty('password')
})

test('users-insert-password-encrypted', async () => {
  const user = { name: 'Due', email: `${Date.now()}@email.com`, password: '123456' }
  const res = await request(app).post(MAIN_ROUTE).send(user)
  expect(res.status).toBe(201)
  const { id } = res.body
  const userDB = await request(app).get(`${MAIN_ROUTE}/${id}`)
  expect(userDB.status).toBe(200)
  expect(userDB.body.password).not.toBe(user.password)
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
  const user = { name: 'John', email: `${Date.now()}@email.com` }
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
