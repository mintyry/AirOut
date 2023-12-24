const router = require('express').Router();

// can delete this once route code blocks are in controllers
const { User } = require ('../../models');

const { getUsers, getOneUser, createUser, updateUser, deleteUser, addFriend, deleteFriend  } = require('../../controllers/userController');

//handling all users, creating users
router.route('/').get(getUsers).post(createUser);
//handling single users
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);
//handling friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;