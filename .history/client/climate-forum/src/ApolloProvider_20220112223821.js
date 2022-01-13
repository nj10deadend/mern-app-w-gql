import App from './App';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql} from "@apollo/client";
import { setContext } from "apollo-link-context";


const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    uri: authLink.concat('http://localhost:5000'),
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