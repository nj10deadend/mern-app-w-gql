// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const today = new Date();
// const formattedDate = today.toLocaleString();
// // const formattedDate = today.toUTCString();


// const commentSchema = new mongoose.Schema({

//     author: { type: Schema.Types.ObjectId, ref: 'User' },
//     authorUsername: {
//         type: String
//     },
//     issue: { type: Schema.Types.ObjectId, ref: "Issue"},
//     body: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: String,
//         default: formattedDate
//     }
// })

// const Comment = mongoose.model('Comment', commentSchema);

// module.exports = Comment;