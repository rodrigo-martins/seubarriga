const request = require('supertest')
const app = require('../src/app')

test('get all users', () => {
  return request(app).get('/users')
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(1)
      expect(res.body[0]).toHaveProperty('name', 'John')
    })
})

test('insert user', () => {
  const user = { name: 'Due', email: 'email@email.com' }
  return request(app).post('/users')
    .send(user)
    .then(res => {
      expect(res.status).toBe(201)
      expect(res.body).toEqual(user)
    })
})
