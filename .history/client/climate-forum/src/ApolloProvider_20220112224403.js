import App from './App';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql} from "@apollo/client";
import { createHttpLink } from '@apollo/client';
import { setContext } from "apollo-link-context";


const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})
console.log(authLink);

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
});
console.log(httpLink);

const client = new ApolloClient({
    uri: 'http://localhost:5000',
    // uri: httpLink,
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