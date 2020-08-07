const request = require('supertest')
const app = require('../../src/app')

test('get all users', () => {
  return request(app).get('/users')
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body.length).toBeGreaterThanOrEqual(0)
    })
})

test('insert user', () => {
  const email = `${Date.now()}@email.com`
  const user = { name: 'Due', email, password: '123456' }
  return request(app).post('/users')
    .send(user)
    .then(res => {
      expect(res.status).toBe(201)
      expect(res.body).toEqual(user)
    })
})
