const mongoose = require('mongoose');
const thoughtSchema = require('./Thought');
const friendSchema = require('./Friend');

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
    thoughts: [thoughtSchema],
    friends: [friendSchema]
});

//need a virtual

const User = model('user', userSchema);

module.exports = User;