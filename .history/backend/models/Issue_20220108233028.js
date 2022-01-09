const mongoose = require('mongoose');
const User = require('User');

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
    }

})

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;