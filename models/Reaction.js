const mongoose = require('mongoose');


const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
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
    }
},
    {
        toJSON: { getters: true },
        //this turns off the other two ids, allowing us to cleanly use reactionId (id: string, _id: objectId)
        id: false,
        _id: false
    }
);

module.exports = reactionSchema;