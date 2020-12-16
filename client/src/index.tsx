import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  ApolloProvider, ApolloClient, InMemoryCache, gql, createHttpLink,
  HttpLink, ApolloLink, Observable, concat, from
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { TokenRefreshLink } from "apollo-link-token-refresh"
import jwtDecode from "jwt-decode";

import { getAccessToken, setAccessToken } from './accessToken';

// import { onError } from '@apollo/client/link/error';

// const link = createHttpLink({
//   uri: 'http://localhost:8000/graphql',
//   // useGETForQueries: true,
//   credentials: 'include'
// })
const cache = new InMemoryCache()
const httpLink = new HttpLink({
  uri: 'http://localhost:8000/graphql',
  credentials: 'include'
})
const authMiddlewareLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken()
  operation.setContext({
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })
  return forward(operation);
});

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if (!token) {
      return true;
    }
    try {
      const tokenDecoded: any = jwtDecode(token);
      const expDate: number = tokenDecoded.exp

      if (Date.now() >= expDate * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch("http://localhost:8000/refresh_token", {
      method: "POST",
      credentials: "include"
    });
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken);
  },
  handleError: err => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  }
})


export const client = new ApolloClient(
  {
    cache,
    link: from([
      tokenRefreshLink,
      onError(({ graphQLErrors, networkError }) => {
        console.log(graphQLErrors);
        console.log(networkError);
      }),
      authMiddlewareLink,
      httpLink,
    ])
  });


// client
//   .query({
//     query: gql`
//      query {
//       hello
//      }
//     `
//   })
//   .then(result => console.log(result.data));

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
