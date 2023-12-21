const mongoose = require('mongoose');
const userSchema = require('./User');
const reactionSchema = require('./Reaction');

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //mongoose docs say it is not automatically executed. Will this execute since I use return? If not, how should I write this?
        get: function formatDate(date) {
            const formattedDate = new Date(date).toLocaleDateString();
            return formattedDate;
        }
    },
    username: [userSchema],
    reactions: [reactionSchema]
});

//need a virtual

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;