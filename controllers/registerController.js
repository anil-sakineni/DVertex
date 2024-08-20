const User = require('../models/registerUser')
const multer = require('multer')

// multer
// storage
const Stroage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now + file.originalname)
    }
})

const upload = multer({
    storage: Stroage
}).single('textImage')





const getUsers = async (req, res, next) => {
    let user;
    try {
        user = await User.find()
    } catch (err) {
        console.log(err);

    }
    if (!user) {
        res.status(400).json({ message: 'no users found' })

    }
    return res.status(200).json({ user })
}

// post request
const Upload = async (req, res, next) => {



    upload(req, res, (err) => {
        if (err) {
            console.log("error");

        }
        else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                phone: req.body.phone,

                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                },
                password: req.body.password

            })

            if (user.name == "" || user.email == "" || user.age === null || user.phone === null || user.image == "" || user.password == "") {
                console.log("failed");
                res.status(400).json({
                    status: "failed",
                    message: "all fields are mandetory"


                })
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
                res.status(400).json({
                    status: "failed",
                    message: "invalid email entered"
                })
            }
            if (!/^[0-9]{10}$/.test(user.phone)) {
                console.log("details");

                res.status(400).json(
                    {
                        status: "failed",
                        message: "phone number must and should be 10"
                    }
                )

            }

            if (!user.image) {
                res.status(400).json(
                    {
                        status: "failed",
                        message: "immage should be mandetory"
                    }
                )
            }
            if (!/^.{8}$/.test(user.password)) {

                res.status(400).json(
                    {
                        status: "failed",
                        message: "password should be must and should 8  letters"
                    }
                )

            }
            user.save()
            return res.status(200).json(user)

        }
    })
    next()
}

// postrequest
const createUsers = async (req, res, next) => {
    
        console.log("user registered successfully");
    
}

const deleteById = async (req, res, next) => {
    const userId = req.params.id;
    let user;
    try {
        user = await User.findByIdAndDelete(userId)
    } catch (err) {
        console.log(err);
    }
    if (!user) {
        res.status(400).json({ message: "user not found" })
    }
    return res.status(200).json({ message: "user deleted successfully" })
}


const updateUser = async (req, res, next) => {
    const { name, email } = req.body
    const userId = req.params.id;
    let user;
    try {
        user = await User.findByIdAndUpdate(userId, { name, email })
    } catch (err) {
        console.log(err);

    }

    if (!user) {
        res.status(400).json({ message: 'user not found' })
    }
    return res.status(200).json({ user })
}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    let user;
    try {
        user = await User.findOne({ email })
    } catch (err) {
        console.log("err");

    }
    
    if (!email || !password) {
        console.log("err");
        res.status(400).json({ message: 'login un successfull' })
    }

    else if (!user) {
        console.log("error");
        res.status(400).json({ message: 'login un successfull' })
    }
    else {
        console.log("login successsfull");
        
        return res.status(200).json({ user })
    }

}
module.exports = {
    getUsers,
    createUsers,
    deleteById,
    updateUser,
    loginUser,
    Upload
}  