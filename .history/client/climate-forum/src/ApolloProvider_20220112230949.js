import App from './App';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink, concat, useQuery, gql} from "@apollo/client";
// import { createHttpLink } from 'apollo-link-http';
import { setContext } from "apollo-link-context";

const httpLink = new HttpLink({ uri: 'http://localhost:5000' });


const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

// const authMiddleware = new ApolloLink((operation, forward) => {
//     // add the authorization to the headers
//     const token = localStorage.getItem('jwtToken');
//     operation.setContext(({ headers = {} }) => ({
//       headers: {
//         ...headers,
//         Authorization: token ? `Bearer ${token}` : '',
//       }
//     }));
  
//     return forward(operation);
// })

const client = new ApolloClient({
    // uri: 'http://localhost:5000',
    // uri: httpLink,
    link: concat(authLink, httpLink),
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