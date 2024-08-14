const express = require('express')
const {
    getUsers,
    createUsers,
    deleteById,
    updateUser,
    loginUser
} = require('../controllers/registerController')

const router = express.Router()

router.get('/', getUsers)
router.post('/add', createUsers)
router.delete('/:id', deleteById)
router.put('/:id', updateUser)
router.post('/login',loginUser)

module.exports = router 