const {gql} = require('apollo-server');

module.exports = gql`
    type User {
        id: ID!
        name: String
        username: String!
        email: String!
        password: String!
        admin: Boolean!
        createdAt: String!
        issues: [Issue!]
    }
    type Issue {
        id: ID!
        author: User!
        username: String
        image: String
        details: String!
        upvotes: Int
        downvotes: Int
        comments: [Comment!]
        createdAt: String
    }
    type Comment {
        id: ID!
        author: User!
        authorUsername: String
        issue: Issue!
        body: String!
        createdAt: String!
    }
    type User {
        id: ID!
        name: String
        email: String!
        password: String!
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
        createComment(body: String!, issueId: ID!): Comment!
        deleteComment(commentId: ID!): String!

    }
`;