const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username:
        {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email:
        {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
        },
        thoughts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    //options object
    //id set to false will not show the string id when retrieving data
    { toJSON: { virtuals: true }, id: false}
);

//need a virtual need to add toJson ^ and getter
userSchema.virtual('friendCount').get(
    function () {
        return this.friends.length;
    }
);

//model is a method that turns a schema into a model (a collection that can stand on its own)
const User = mongoose.model('User', userSchema);
module.exports = User;