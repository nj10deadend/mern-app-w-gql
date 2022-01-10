const {gql} = require('apollo-server');

module.exports = gql`
    type User {
        id: ID!
        name: String
        email: String!
        password: String!
        admin: Boolean!
        createdAt: String!
        issues: [Issue!]
    }
    type Issue {
        id: ID!
        author: User!
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
        issue: Issue!
        description: String!
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
        email: String!
        password: String!
    }
    # input CreateIssueInput {
    #     author: User!
    #     image: String
    #     details: String!
    # }
    type Query {
        hello: String
    }
    type Query {
        getUsers: [User]
        getIssues: [Issue]
        getIssue(issueId: ID!): Issue
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User!
        createIssue(author: String, image: String, details: String!): Issue!
    }
`;