const express = require('express')
const router = express.Router()

const { selectByUserId, insert, selectById, updateById, deleteById, owner } = require('../controllers/transactions')

// Routes
router.param('id', owner)
router.get('/', selectByUserId)
router.get('/:id', selectById)
router.post('/', insert)
router.put('/:id', updateById)
router.delete('/:id', deleteById)

module.exports = router
