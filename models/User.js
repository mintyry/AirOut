const mongoose = require('mongoose');
const Thought = require('./Thought');


const userSchema = new mongoose.Schema({
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
    //check if correct
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

//need a virtual

const User = model('user', userSchema);
module.exports = User;