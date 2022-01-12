const Issue = require('../../models/Issue');
const checkAuth = require('../../util/check-auth');
const {commentValidators} = require('../../util/commentValidators');


const {UserInputError} = require('apollo-server');
const {AuthenticationError} = require('apollo-server');


module.exports = {
    Mutation: {
        createComment: async (_, {issueId, body}, context) => {
            const user = checkAuth(context);

            const {valid, errors} = commentValidators(body, issueId);
            if (!valid) {
                throw new UserInputError('Errors', {errors});
            }

            const issue = await Issue.findById(issueId);

            if (issue) {
                issue.comments.unshift({body, username: user.username});

                await issue.save();
                console.log("Post successfully created 😄")
                return issue;
            } else {
                throw new UserInputError('Issue with given ID not found ❌');
            }
        }, 
        deleteComment: async (_, {issueId, commentId}, context) => {
            const user = checkAuth(context);
            console.log(user);
            
            const issue = await Issue.findById(issueId);

            if (issue) {
                // const commentIndex = issue.comments.indexOf(commentId);
                const commentIndex = issue.comments.findIndex(comment => comment.id === commentId);
                console.log(commentId);
                console.log(issue.comments);
                console.log(issue.comments[commentIndex]);

                if (issue.comments[commentIndex].username === user.username) {
                    
                    issue.comments.splice(commentIndex, 1);
                    await issue.save();
                    return issue;
                } else {
                    throw new AuthenticationError("Access to action denied: Action not allowed 👊")
                }

            } else {
                throw new UserInputError('Issue with given ID not found ❌');
            }
        }
    }
}