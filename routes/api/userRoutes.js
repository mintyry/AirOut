const router = require('express').Router();

// can delete this once route code blocks are in controllers
const { User } = require ('../../models');

const { getUsers, getOneUser, createUser, updateUser  } = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getOneUser).put(updateUser);

module.exports = router;