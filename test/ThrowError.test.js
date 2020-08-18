const ThrowError = require('../src/errors/ThrowError')

test('throw-error', async () => {
  const error = new ThrowError('throw-error')
  expect(error.code).toBe('throw-error')
  expect(error.message).toBe('Throw Error')
})

test('throw-error-not-found', async () => {
  const error = new ThrowError('throw-error-not-found')
  expect(error.code).toBe('throw-error-not-found')
  expect(error.message).toBe('Ops...')
})
