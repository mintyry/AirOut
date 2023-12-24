const mongoose = require('mongoose');
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
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
{ toJSON: { getters: true, virtuals: true }, id: false }
);

//need a virtual
thoughtSchema.virtual('reactionCount').get(
    function () {
        return this.reactions.length;
    }
);

const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;