const mongoose = require('mongoose')

const registerUser = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        minlength: [10, "please enter only 10 digits"]
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("register", registerUser)