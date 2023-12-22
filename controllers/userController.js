const { User } = require('../models');

// function to find and read all users
async function getUsers(req, res) {
    try {
        const allUsers = await User.find({});
        res.status(200).json(allUsers);
    } catch (error) {
        console.log('Could not get all users');
        res.status(500).json({ message: 'could not get all users' });
    }
};

//function to find one user and read
async function getOneUser(req, res) {
    try {
        const oneUser = await User
            .findOne({ _id: req.params.userId })
            .select('-__v');

        if (!oneUser) {
            return res.status(404).json({ message: 'User does not exist' })
        }
        res.status(200).json(oneUser);
    } catch (error) {
        console.log('Could not get all users');
        res.status(500).json({ error });
    }
};

//function to create a user
async function createUser(req, res) {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);

    } catch (error) {
        console.log('could not make user');
        res.status(500).json(error);
    }
};

//function to update user
async function updateUser(req, res) {
    try {
        const editedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            req.body,
            { new: true }
        );
        res.json(editedUser);

    } catch (error) {
        console.log('could not update user');
        res.status(500).json(error);
    }
};

//function to delete user
async function deleteUser(req, res) {
    console.log('this hit first')
    try {
        console.log('this hit second')
        const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });
        console.log('this hit third')
        console.log(deletedUser);
        if(!deletedUser){
            return res.status(404).json({message: 'Cannot delete a user that does not exist'});
        }

        res.json({message: 'User deleted.'});

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json(error);
    }
};

module.exports = { getUsers, getOneUser, createUser, updateUser, deleteUser };