const {AuthenticationError} = require('apollo-server');

const Issue = require('../../models/Issue');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {
        getIssues: async () => {
            return await Issue.find().sort({createdAt: -1});
        }, 
        getIssue: async (_, {issueId}) => {

            try {
                const foundIssue = await Issue.findById(issueId); 
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
            // const newIssue = await Issue.create({author, image, details});
            const newIssue = await Issue.create({author: user.id, image, details})
            console.log(newIssue);

            return newIssue;
        }, 
        deleteIssue: async (_, {issueId}, context) => {

            const user = checkAuth(context);
            console.log(user);
            try {
                const userPost = await Issue.findById(issueId);
                console.log(userPost.author);

                if (user.id === userPost.author) {
                    await userPost.delete();
                    console.log("Post successfully deleted")
                } else {
                    throw new AuthenticationError("Action not allowed")

                }
            } catch(err) {
                throw new Error(err);

            }
        }
    }
}