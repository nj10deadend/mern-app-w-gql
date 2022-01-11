const {AuthenticationError} = require('apollo-server');

const Issue = require('../../models/Issue');
const checkAuth = require('../../util/check-auth');

/// TODO: Delete all Users and Issues and start anew. The schema has been updated way too many times
/// TODO: Refer to medium article again for improved database relations

module.exports = {
    Query: {
        getIssues: async () => {
            return await Issue.find().sort({createdAt: -1});
        }, 
        getIssue: async (_, {issueId}) => {

            try {
                const foundIssue = await Issue.findById(issueId); 
                console.log(foundIssue.author._id);
                if (!foundIssue) {
                    throw new Error('Climate issue post not found')
                } else {
                    return foundIssue;
                }

            } catch (err) {
                throw new Error(err);
            }


        }
    }, 
    Mutation: {
        createIssue: async (_, {image, details}, context) => {

            const user = checkAuth(context);
            console.log(user);
            console.log(user.username);
            // const newIssue = await Issue.create({author, image, details});
            const newIssue = await Issue.create({author: user.id, username: user.username, image, details})
            console.log(newIssue);

            return newIssue;
        }, 
        deleteIssue: async (_, {issueId}, context) => {

            const user = checkAuth(context);
            console.log(user);
            // console.log(user.id);
            try {
                const userPost = await Issue.findById(issueId);

                console.log(user.username);
                console.log(userPost.username);
                console.log(user.username === userPost.username);

                if (user.username === userPost.username) {
                    await userPost.delete();
                    console.log("Post successfully deleted")
                    return "Post successfully deleted"
                } else {
                    throw new AuthenticationError("Action not allowed")

                }
            } catch(err) {
                throw new Error(err);

            }
        }
    }
}