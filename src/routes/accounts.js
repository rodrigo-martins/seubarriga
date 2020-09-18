const express = require('express')
const router = express.Router()

const { select, insert, selectById, updateById, owner, deleteById } = require('../controllers/accounts')

// Routes
router.param('id', owner)

router.get('/', select)
router.get('/:id', selectById)
router.post('/', insert)
router.put('/:id', updateById)
router.delete('/:id', deleteById)

module.exports = router
