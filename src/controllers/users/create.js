const create = async (req, res) => {
  const result = await req.locals.db.insert(req.body, '*')
  res.status(201).json(result[0])
}
module.exports = { create }
