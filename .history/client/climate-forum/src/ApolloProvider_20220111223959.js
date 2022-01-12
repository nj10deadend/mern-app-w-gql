import App from './App';
// import ApolloClient from 'apollo-client';
// import { inMemoryCache } from 'apollo-cache-inmemory';

import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql} from "@apollo/client";


const client = new ApolloClient({
    uri: 'http://localhost:5000/',
    cache: new InMemoryCache()
});

function apolloProvider() {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    )
}

export default apolloProvider;