import App from './App';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink, concat, useQuery, gql} from "@apollo/client";
// import { createHttpLink } from 'apollo-link-http';
import { setContext } from "apollo-link-context";
import { onError } from 'apollo-link-error';
// import { ApolloLink } from 'apollo-link';

const httpLink = new HttpLink({ uri: 'http://localhost:5000' });

const token = localStorage.getItem('jwtToken');
console.log(token);




const authLink = setContext(() => {
    // const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log('graphQLErrors', graphQLErrors);
    }
    if (networkError) {
      console.log('networkError', networkError);
    }
});

const link = new ApolloLink.from([errorLink, httpLink]);

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
const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    // const token = localStorage.getItem('jwtToken');
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}` || null,
      }
    }));
  
    return forward(operation);
})

const client = new ApolloClient({
    // uri: 'http://localhost:5000',
    // uri: httpLink,
    link: concat(authMiddleware, httpLink),
    // link: concat(authLink, httpLink),
    // link: authLink.concat(httpLink),
    link,
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