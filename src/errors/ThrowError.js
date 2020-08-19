module.exports = function ThrowError (code) {
  this.name = 'ThrowError'
  this.code = code
  switch (code) {
    // TODO - Translate
    case 'throw-error':
      this.message = 'Throw Error'
      break
    case 'accounts-select-by-id-not-found':
      this.message = 'Account id not found.'
      break
    case 'accounts-insert-not-name':
      this.message = 'Parameter name not found.'
      break
    case 'accounts-insert-not-user_id':
      this.message = 'Paramenter user_id not found.'
      break
    case 'users-insert-not-name':
      this.message = 'Parameter name not found.'
      break
    case 'users-insert-not-email':
      this.message = 'Parameter email not found.'
      break
    case 'users-insert-not-password':
      this.message = 'Parameter password not found.'
      break
    case 'users-insert-not-unique-email':
      this.message = 'Parameter unique email not found.'
      break
    case 'users-select-first-not-found':
      this.message = 'User not found.'
      break
    default:
      this.message = 'Ops...Something going wrong.'
      break
  }
}
