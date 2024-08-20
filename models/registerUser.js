const mongoose = require('mongoose')

const registerUser = mongoose.Schema({
    name: {
        type: String,
        required: [true]

    },
    email: {
        type: String,
        required: true

    },

    age: {
        type: Number,
        required: [true]
    },
    phone: {
        type: Number,
        required: [true],

    },
    image: {
        data: [],
        contentType:String,
        
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("register", registerUser)

// add image
// validations for the inputs
// users should be update its information

