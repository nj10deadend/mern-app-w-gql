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
        }
    }
}