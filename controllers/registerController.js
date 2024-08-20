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
})


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
const createUsers = async (req, res, next) => {



    upload.single('textImage')(req, res, async (err) => {
        if (err) {
            console.log("file upload error");

        }
        else {
            const { email } = req.body
            let existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "this user already exists" })
            }

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                phone: req.body.phone,

                image: {
                    data: req.file.filename
                },
                password: req.body.password

            })
            
            if (user.name == "" || user.email == "" || user.age === null || user.phone === null || user.image == "" || user.password == "") {
                console.log("failed");
                return res.status(400).json({
                    status: "failed",
                    message: "all fields are mandetory"


                })
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
                return res.status(400).json({
                    status: "failed",
                    message: "invalid email entered"
                })
            }
            if (!/^[0-9]{10}$/.test(user.phone)) {
                console.log("details");

                return res.status(400).json(
                    {
                        status: "failed",
                        message: "phone number must and should be 10"
                    }
                )

            }

            if (!/\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(user.image.data)) {
                return res.status(400).json(
                    {
                        status: "failed",
                        message: "immage should be perticular format"
                    }
                )
            }
            if (!/^.{8}$/.test(user.password)) {

                return res.status(400).json(
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
    const { name, email, age, phone, password, image } = req.body
    const userId = req.params.id;
    let user;
    try {
        user = await User.findByIdAndUpdate(userId, { name, email, age, phone, password, image })
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
    loginUser
}  