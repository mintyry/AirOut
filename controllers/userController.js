const { User } = require('../models');

// function to find and read all users
async function getUsers(req, res) {
    try {
        const result = await User.find({});
        res.status(200).json(result);
    } catch (error) {
        console.log('Could not get all users');
        res.status(500).json({ message: 'could not get all users' });
    }
};

//function to create a user
async function createUser(req, res) {
    try {
        const user = await User.create(req.body);
        res.json(user);

    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { getUsers, createUser };