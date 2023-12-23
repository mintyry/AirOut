const { User, Thought } = require('../models');

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

//function to find one user by _id and read
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
        console.log('Could not get one user');
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

//function to update user by _id
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

//function to delete user by _id
async function deleteUser(req, res) {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });
 
        if(!deletedUser){
            return res.status(404).json({message: 'Cannot delete a user that does not exist'});
        }

        //BONUS: deletes thoughts along with user
        await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });

        res.json({message: 'User and their thoughts have been deleted.'});

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json(error);
    }
};

module.exports = { getUsers, getOneUser, createUser, updateUser, deleteUser };