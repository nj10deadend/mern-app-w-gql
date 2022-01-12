import App from './App';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql} from "@apollo/client";


const client = new ApolloClient({
    uri: 'http://localhost:5000/',
    cache: new InMemoryCache()
});

function ApolloProviderHub() {
    return (
        <React.StrictMode>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </React.StrictMode>
    )
}

export default ApolloProviderHub;