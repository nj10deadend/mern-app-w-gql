const {ApolloServer, gql} = require('apollo-server');

const port = 5000;

const typeDefs = gql`
    type Query {
        sayHi: String!
    }
`;

const resolvers = {
    Query: {
        sayHi: () => 'Hello World!!!!'
    }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen({port}).then(res => {
    console.log(`Server running at ${res.url}`)
})