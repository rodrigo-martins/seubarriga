
const getAll = (req, res) => {
  const users = [
    { name: 'John', email: 'email@email.com' }
  ]
  res.status(200).json(users)
}
module.exports = { getAll }
