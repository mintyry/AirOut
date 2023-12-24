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

//function to add friend by _id
async function addFriend(req, res) {
    try {
        const user = await User
        .findOne({_id: req.params.userId})
        .select('-__v');

        const addedFriend = await User
        .findOne({_id: req.params.friendId})
        .select('-__v');

        if (!addedFriend) {
            return res.status(404).json({message: 'Could not find the user you want to add.'})
        }
        const madeNewFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: addedFriend._id } },
            { new: true }
        );

        //code so that when person 1 adds person 2, they are both friends.
        //Without this, when person 1 adds person 2, person 2 is added to person 1's friends list,
        //but person 1 is not added to person 2's list.
        const youreTheirFriendToo = await User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $addToSet: { friends: user._id }},
            { new: true }
        )
            
        if (!madeNewFriend) {
            return res.status(404).json({message: 'User trying to add friend does not exist.'})
        }

        res.status(200).json({ message: 'You are both friends!', madeNewFriend, youreTheirFriendToo })

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json(error);
    }
};

//function to delete friend by _id
async function deleteFriend(req, res) {
    try {
        const user = await User
        .findOne({_id: req.params.userId})
        .select('-__v');
        
        const friend = await User
        .findOne({_id: req.params.friendId})
        .select('-__v');

        if (!friend) {
            return res.status(404).json({message: 'Could not find the friend you want to delete.'})
        }
        const youLostAFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: friend._id } },
            { new: true }
        );
        //code so that when person 1 deletes person 2, they are both removed from each other's friends list.
        const friendLostYouToo = await User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $pull: { friends: user._id }},
            { new: true }
        )
            
        if (!youLostAFriend) {
            return res.status(404).json({message: 'User trying to delete friend does not exist.'})
        }

        res.status(200).json({ message: 'You lost a friend!', youLostAFriend, friendLostYouToo })

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json(error);
    }
};

module.exports = { getUsers, getOneUser, createUser, updateUser, deleteUser, addFriend, deleteFriend };