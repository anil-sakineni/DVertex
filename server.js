const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const router = require('./routes/registerRoute')
const bodyParser = require('body-parser')
const multer = require('multer')

// App initilization
const app = express()

// .env file config
dotenv.config()

app.use(express.json())

// body parser
app.use(bodyParser.urlencoded({ extended: true }))

// db connection 
connectDB()

const port = process.env.PORT

// server started
app.listen(port, () => {
    console.log(`server started at ${port}`)
})

// routes
app.use('/api/users', router)
// app.use('/api/users/',router)


