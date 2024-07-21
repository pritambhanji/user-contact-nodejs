const express = require("express");
const app = express();
const router = express.Router();

const { getUsers,
    registerUser,
    getUser,
    updateContacUser,
    deleteUser } = require('../controllers/userController');

router.route('/').get(getUsers).post(registerUser)
router.route('/:id').get(getUser).put(updateContacUser).delete(deleteUser)
