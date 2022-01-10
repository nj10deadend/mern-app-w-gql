const mongoose = require('mongoose');
const { Schema } = mongoose;

const today = new Date();
const date = today.getFullYear()+ '-' + (today.getMonth() + 1) + '-' + today.getDate();
// const formattedDate = date.toLocaleString();
// const formattedDate = today.toUTCString();
const formattedDate = today.toLocaleString();


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        default: 'Anonymous'
    },
    username: {
        type: String,
        required: true,
        default: 'anon'
    },
    email: {
        type: String,
        required: [true, 'User email can\'t be blank'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'User password can\'t be blank'],
    },
    admin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String,
        default: formattedDate
    },
    issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;