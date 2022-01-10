const Issue = require('../../models/Issue');


module.exports = {
    Query: {
        getIssues: async () => {
            return await Issue.find();
        }, 
        getIssue: async (_, issueId) => {
            const foundIssue = await Issue.findOne({_id: issueId}); 

            if (!foundIssue) {
                throw new Error('Climate issue post not found')
            }

            return foundIssue;
        }
    }, 
    Mutation: {
        createIssue: async (_, author, image, details) => {
            const newIssue = await Issue.create({author, image, details})
            return newIssue;
        }
    }
}