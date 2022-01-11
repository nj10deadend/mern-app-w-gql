// require('dotenv').config({path: '../../config/.env'})

// const Comment = require('../../models/Comment');
// const Issue = require('../../models/Issue');
// const User = require('../../models/User');

// const checkAuth = require('../../util/check-auth');
// const {UserInputError} = require('apollo-server');
// const {AuthenticationError} = require('apollo-server');

// const {commentValidators} = require('../../util/commentValidators');

// module.exports = {
//     Query: {
//         getComments: async () => {
//             const comments = await Comment.find();
//             return comments;
//         }
//     },
//     Mutation: {
//         createComment: async (_, {body, issueId}, context) => {

//             const user = checkAuth(context);
//             console.log(user);
            
//             const {valid, errors} = commentValidators(body, issueId);
//             if (!valid) {
//                 throw new UserInputError('Errors', {errors});
//             }

//             const issue = await Issue.findById(issueId);
//             console.log(issue);

//             if (!issue) {
//                 console.log("Issue with given id not found");
//                 throw new Error("Issue with given id not found");
//             } else {
//                 const newComment = await Comment.create({author: user.id, authorUsername: user.username, issue, body});
//                 await Issue.updateOne({_id: issue._id}, {$push: {comments: newComment._id}});
//                 await User.updateOne({name: user.name, username: user.username}, {$push: {comments: newComment._id}});
//                 console.log(newComment);
//                 return newComment;
//             }

//         },
//         deleteComment: async (_, {commentId}, context) => {
//             const user = checkAuth(context);
//             console.log(user);
            
//             try {
//                 const userComment = await Comment.findById(commentId);
//                 const userDbEntry = await User.findOne({email: user.email, username: user.username});

//                 const commentsArrInUserDb = userDbEntry.comments;

//                 const commentsInArr = commentsArrInUserDb.filter(eachComment => eachComment.valueOf() === userComment._id.valueOf())
//                 console.log(user.username);
//                 console.log(userComment.authorUsername);
//                 console.log(user.username === userComment.authorUsername);
//                 console.log(commentsInArr);


//                 if (user.username === userComment.authorUsername) {
//                     await userComment.delete();
//                     console.log("Your comment was successfully deleted 😄");
//                     if (commentsInArr) {
//                         await User.updateOne({comments: commentsInArr}, {$set: {comments: []}});
//                         await Issue.updateOne({comments: commentsInArr}, {$set: {comments: []}});

//                         console.log("User.comments entry successfully deleted 😄");
//                     }
//                     return "Comment successfully deleted 😄"
//                 } else {
//                     throw new AuthenticationError("Acess to action denied: Action not allowed 👊")
//                 }

//             } catch (err) {
//                 throw new Error(err);
//             }
//         }
//     }
// }