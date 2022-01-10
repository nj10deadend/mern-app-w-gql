const Issue = require('../../models/Issue');


module.exports = {
    Query: {
        getIssues: async () => {
            return await Issue.find();
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
        createIssue: async (_, {author, image, details}) => {
            const newIssue = await Issue.create({author, image, details})
            return newIssue;
        }
    }
}