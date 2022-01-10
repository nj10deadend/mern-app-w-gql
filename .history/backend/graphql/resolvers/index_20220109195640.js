const userResolver = require('./users');
const issueResolver = require('./issues');
const commentResolver = require('./comments');

module.exports = {
    Query: {
        ...userResolver.Query
    }, 
    Mutation: {
        ...userResolver.Mutation
    }
}