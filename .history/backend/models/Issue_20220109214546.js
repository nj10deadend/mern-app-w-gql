const mongoose = require('mongoose');
// const User = require('User');
const today = new Date();
const date = today.getFullYear()+ '-' + (today.getMonth() + 1) + '-' + today.getDate();
// const formattedDate = date.toLocaleString();
// const formattedDate = today.toUTCString();
const formattedDate = today.toLocaleString();


const { Schema } = mongoose;

const issueSchema = new mongoose.Schema({

    author: { type: Schema.Types.ObjectId, ref: 'User' },
    image: {
        type: String
    },
    details: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments'}],
    createdAt: {
        type: String,
        default: formattedDate
    }


})

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;