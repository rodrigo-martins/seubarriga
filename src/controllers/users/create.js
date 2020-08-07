const create = (req, res) => {
  res.status(201).json(req.body)
}
module.exports = { create }
