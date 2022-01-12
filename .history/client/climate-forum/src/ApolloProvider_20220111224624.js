import App from './App';
import React from 'react';
// import ApolloClient from 'apollo-client';
// import { inMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql} from "@apollo/client";
import Home from './Home';


const client = new ApolloClient({
    uri: 'http://localhost:5000/',
    cache: new InMemoryCache()
});

function ApolloProvider() {
    return (
        <React.StrictMode>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </React.StrictMode>
    )
}

export default ApolloProvider;