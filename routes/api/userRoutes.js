const router = require('express').Router();

// can delete this once route code blocks are in controllers
const { User } = require ('../../models');

const { getUsers, createUser, getOneUser } = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getOneUser);

module.exports = router;