const mongoose = require('mongoose');
const { Schema } = mongoose;

const today = new Date();
const date = today.getFullYear()+ '-' + (today.getMonth() + 1) + '-' + today.getDate();
const formattedDate = today.toLocaleString();
// const formattedDate = today.toUTCString();


const commentSchema = new mongoose.Schema({

    author: { type: Schema.Types.ObjectId, ref: 'User' },
    issue: { type: Schema.Types.ObjectId, ref: "Issue"},
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: formattedDate
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;