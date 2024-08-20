const express = require('express')
const registerModel = require('../models/registerUser')
const {
    getUsers,
    createUsers,
    deleteById,
    updateUser,
    loginUser, 
    Upload
} = require('../controllers/registerController')


const router = express.Router()



router.get('/', getUsers)
router.post('/add',  Upload)
router.delete('/:id', deleteById)
router.put('/:id', updateUser)
router.post('/login', loginUser)

module.exports = router 