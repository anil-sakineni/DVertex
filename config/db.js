const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectDB = async () => {
    mongoose.connect(process.env.URI)

    const db = mongoose.connection;

    db.once('error', () => {
        console.log('mongo  db connection error');
    })
    db.on('open', () => {
        console.log('mongodb connection successful');
    })
}

module.exports = connectDB
