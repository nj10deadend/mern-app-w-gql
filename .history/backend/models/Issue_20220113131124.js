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
    upvotes: [
        {
            count: {
                type: Number,
                default: 0
            },
            username: {
                type: String
            }, 
            createdAt: {
                type: String,
                default: formattedDate
            }
        }
    ],
    downvotes: [
        {
            count: {
                type: Number,
                default: 0
            },
            username: {
                type: String
            },
            createdAt: {
                type: String,
                default: formattedDate
            }
        }
    ],
    comments: [
        {
            body:  {
                type: String,
                required: true
            },
            username: {
                type: String
            },
            createdAt: {
                type: String,
                default: formattedDate
            }

        }
    ],
    createdAt: {
        type: String,
        default: formattedDate
    }

})

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;