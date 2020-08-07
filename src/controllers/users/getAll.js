const getAll = (req, res) => {
  req.locals.db('users').select()
    .then(users => {
      console.log(users)
      res.status(200).json(users)
    })
}
module.exports = { getAll }
