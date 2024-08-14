const User = require('../models/registerUser')

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

const createUsers = async (req, res, next) => {
    const { name, email, age, phone, password, confirmPassword } = req.body
    let existingUser;
    try {
        existingUser = await User.findOne({ email })
    } catch (err) {
        console.log(err);
    }
    if (existingUser) {
        return res.status(400).json({ message: 'user already exists' })
    }
    else if (password != confirmPassword) {
        return res.status(400).json({ message: 'password does not match' })

    }

    const user = new User({
        name,
        email,
        age,
        phone,
        password,
        confirmPassword
    })
    try {

        await user.save()
    } catch (err) {
        console.log(err);

    }


    return res.status(200).json({
        user
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
        console.log(err);

    }
    if (!email) {
        res.status(400).json({ message: 'login un successfull' })
    }
    if (!password) {
        res.status(400).json({ message: 'login un successfull' })
    }

    return res.status(200).json({ user })

}
module.exports = {
    getUsers,
    createUsers,
    deleteById,
    updateUser,
    loginUser
}  