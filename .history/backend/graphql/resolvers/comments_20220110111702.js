require('dotenv').config({path: '../../config/.env'})
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Comment = require('../../models/Comment');
const Issue = require('../../models/Issue');

const checkAuth = require('../../util/check-auth');
const {UserInputError} = require('apollo-server');
const {AuthenticationError} = require('apollo-server');
const {commentsValidator} = require('../../util/commentValidators');

module.exports = {
    Query: {
        getComments: async () => {
            const comments = await Comment.find();
            return comments;
        }
    },
    Mutation: {
        createComment: async (_, {body, issueId}, context) => {

            const user = checkAuth(context);
            console.log(user);
            
            const {valid, errors} = commentsValidator(body, issueId);
            if (!valid) {
                throw new UserInputError('Errors', {errors});
            }

            const issue = await Issue.findById(issueId);
            console.log(issue);

            if (!issue) {
                console.log("Issue with given id not found");
                throw new Error("Issue with given id not found");
            } else {
                const newComment = await Comment.create({author: user.id, authorUsername: user.username, issue, body});
                console.log(newComment);
            }

        },
        deleteComment: async (_, {commentId}, context) => {
            const user = checkAuth(context);
            console.log(user);
            
            try {
                const userComment = await Comment.findById(commentId);
                console.log(user.username);
                console.log(userComment.authorUsername);
                console.log(user.username === userComment.authorUsername);

                if (user.username === userComment.authorUsername) {
                    await userComment.delete();
                    console.log("Your comment was successfully deleted 😄");
                    return "Comment successfully deleted"
                } else {
                    throw new AuthenticationError("Acess to action denied: Action not allowed 👊")
                }

            } catch (err) {
                throw new Error(err);
            }
        }
    }
}