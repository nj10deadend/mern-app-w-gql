import App from './App';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink, concat, useQuery, gql} from "@apollo/client";
import { setContext } from "apollo-link-context";
import { onError } from 'apollo-link-error';

const httpLink = new HttpLink({ uri: 'http://localhost:5000' });

const token = localStorage.getItem('jwtToken');
/// Youtube Tutorial add headers method

// const authLink = setContext(() => {
//     // const token = localStorage.getItem('jwtToken');
//     return {
//         headers: {
//             Authorization: token ? `Bearer ${token}` : ''
//         }
//     }
// })

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log('graphQLErrors', graphQLErrors);
    }
    if (networkError) {
      console.log('networkError', networkError);
    }
});

const link = new ApolloLink.from([errorLink, httpLink]); // => Error handling for apollo client
const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    // const token = localStorage.getItem('jwtToken');
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      }
    }));
  
    return forward(operation);
})

// uri: 'http://localhost:5000', /// => You can use uri but you won't be able to concatenate headers to it. You have to use 'link: ' instead
/// THEN put the uri 'localhost:5000 '
const client = new ApolloClient({
    link, // => Adds more useful errors for apollo. MAKE SURE THIS IS ADDED ABOVE EVERYTHING ELSE!!!!!!!!!!!!!!!
    link: concat(authMiddleware, httpLink), /// => How to concatenate token with Header
    // link: concat(authLink, httpLink), /// => This works as well
    // link: authLink.concat(httpLink), /// => This works as well
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