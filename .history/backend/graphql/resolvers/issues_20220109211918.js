const Issue = require('../../models/Issue');


module.exports = {
    Query: {
        getIssues: async () => {
            return await Issue.find();
        }
    }
}