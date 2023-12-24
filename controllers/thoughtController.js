const { User, Thought } = require('../models');

//function to read all thoughts
async function getThoughts(req, res) {
    try {
        const allThoughts = await Thought.find({});
        res.status(200).json(allThoughts);
    } catch (error) {
        console.log('Could not get all thoughts');
        res.status(500).json({ error });
    }
};

//function to read one thought by _id
async function getOneThought(req, res) {
    try {
        const oneThought = await Thought
            .findOne({ _id: req.params.thoughtId })
            .select('-__v');

        if (!oneThought) {
            return res.status(404).json({ message: 'Thought does not exist' })
        }
        res.status(200).json(oneThought);
    } catch (error) {
        console.log('Could not get one thought');
        res.status(500).json({ error });
    }
};

//function to create thought
async function airOutThought(req, res) {
    try {
        // check to see if poster has an existing username and userid, if not, they cannot post.
        const validUser = await User.findOne({ username: req.body.username, _id: req.body.userId });
        if (!validUser) {
            return res.status(404).json({ message: 'Sign up to air out your thoughts!' });
        }


        const newThought = await Thought.create(req.body);
        //adding it to user's thoughts field
        const user = await User.findOneAndUpdate
            (
                //adding filter for _id AND username makes it so that if making a thought and either one of those fields is incorrect, the thought will not save to the user's thoughts field.
                { _id: req.body.userId, username: req.body.username },
                { $addToSet: { thoughts: newThought._id } },
                { new: true }
            );

        if (!user) {
            return res.status(404).json({
                message: 'Thought aired out, but no user with that ID.'
            })
        };
        res.json({
            message: 'Your thought was aired out. Check thought get route to see newly made thought, check users get route to see thought associated with user.'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

//function to update thought by _id
async function updateThought(req, res) {
    try {
        const reThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { new: true }
        );

        if (!reThought) {
            return res.status(404).json({
                message: 'No thought with that ID.'
            })
        }

        res.json(reThought);

    } catch (error) {
        console.log('could not update user');
        res.status(500).json(error);
    }
};

//function to delete thought by _id
async function deleteThought(req, res) {
    try {
        const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!deletedThought) {
            return res.status(404).json({ message: 'Cannot delete a thought that does not exist' });
        }

        res.json({ message: 'Your thought have been deleted. Flash Men In Black light.' });

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json(error);
    }
};

//REACTIONS

//function to create reaction
async function addReaction(req, res) {
    try {
        //validates to ensure only a user can react
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist.' });
        }
        
        const thought = await Thought.findOneAndUpdate
            (
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            );

        if (!thought) {
            return res.status(404).json({ message: 'No thought to react to.' });
        }

        res.json(thought);

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json(error);
    }
};

//function to delete reactions
async function deleteReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate
            (
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.body } },
                { runValidators: true, new: true }
            );

        if (!thought) {
            return res.status(404).json({ message: 'Thought does not exist' });
        }

        res.json(thought);

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json(error);
    }
};


module.exports = { getThoughts, getOneThought, airOutThought, updateThought, deleteThought, addReaction, deleteReaction };