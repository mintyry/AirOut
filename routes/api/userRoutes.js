const router = require('express').Router();

// can delete this once route code blocks are in controllers
const { User } = require ('../../models');

const { getUsers, getOneUser, createUser, updateUser, deleteUser, addFriend, deleteFriend  } = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;