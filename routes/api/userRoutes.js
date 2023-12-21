const router = require('express').Router();

// can delete this once route code blocks are in controllers
const { User } = require ('../../models');

const { getUsers, createUser } = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);


module.exports = router;