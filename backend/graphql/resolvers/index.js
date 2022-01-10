const userResolver = require('./users');
const issueResolver = require('./issues');
const commentResolver = require('./comments');

module.exports = {
    Query: {
        ...userResolver.Query,
        ...issueResolver.Query
    }, 
    Mutation: {
        ...userResolver.Mutation,
        ...issueResolver.Mutation
    }
}