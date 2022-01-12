const {gql} = require('apollo-server');

module.exports = gql`
    # type User {
    #     id: ID!
    #     name: String
    #     username: String!
    #     email: String!
    #     password: String!
    #     admin: Boolean!
    #     issues: [Issue]!
    #     createdAt: String!
    # }
    type Issue {
        id: ID!
        author: User!
        username: String
        image: String
        details: String!
        upvotes: [Vote]!
        downvotes: [Vote]!
        comments: [Comment]!
        createdAt: String
    }
    type Comment {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type Vote {
        id: ID!
        username: String!
        createdAt: String
    }
    type User {
        id: ID!
        name: String
        username: String!
        email: String!
        password: String!
        admin: String
        token: String!
        createdAt: String
    }
    input RegisterInput {
        name: String
        username: String!
        email: String!
        password: String!
    }
    type Query {
        hello: String
    }
    type Query {
        getUsers: [User]
        getIssues: [Issue]
        getIssue(issueId: ID!): Issue
        getComments: [Comment]
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User!
        createIssue(image: String, details: String!): Issue!
        deleteIssue(issueId: ID!): String!
        createComment(body: String!, issueId: String!): Issue!
        deleteComment(issueId: ID!, commentId: ID!): Issue!
        upvoteIssue(issueId: ID!): Issue!
        downvoteIssue(issueId: ID!): Issue!
    }
`;