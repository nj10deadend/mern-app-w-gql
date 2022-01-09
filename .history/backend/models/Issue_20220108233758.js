const mongoose = require('mongoose');
// const User = require('User');
const today = new Date();
const date = today.getFullYear()+ '-' + (today.getMonth() + 1) + '-' + today.getDate();
const formattedDate = date.toLocaleString();

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
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments'}],
    upvotes: {
        type: Number,
        defaultValue: 0
    },
    downvotes: {
        type: Number,
        defaultValue: 0
    },
    createdAt: {
        type: String,
        default: formattedDate
    }


})

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;