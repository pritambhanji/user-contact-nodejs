const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

//@desc Get all users
//@route GET /api/users
//@access Public

const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find()
    res.status(200).json(users);
});


//@desc Create New User
//@route POST /api/users
//@access Private
const createUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body
    if (!name || !email || !password) {
        res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    
    res.status(201).json(user);
});


//@desc Get a User
//@route GET /api/users/:id
//@access Private
const getUser = asyncHandler(async(req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email})
    if(!user) {
        res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
});

//@desc Update a User
//@route PUT /api/users/:id
//@access Private
const updateContacUser = asyncHandler(async(req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.email, req.body)
    if(!updatedUser) {
        res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", _id: updatedUser._id, email: updatedUser.email });
});

//@desc delete a User
//@route DELETE /api/users/:id
//@access Private
const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.email)
    if (!user) {
        res.status(404).json({ message: "User not found" });
    }
    await user.remove()
    res.status(201).json({ message: `User is deleted with email ${user.email}` });
})


module.exports = {
    getUsers,
    createUser,
    getUser,
    updateContacUser,
    deleteUser
}