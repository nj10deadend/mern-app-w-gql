const mongoose = require('mongoose');

const today = new Date();
const formattedDate = today.toLocaleString();

const { Schema } = mongoose;

const issueSchema = new mongoose.Schema({

    author: { type: Schema.Types.ObjectId, ref: 'User' },
    username: {
        type: String
    },
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