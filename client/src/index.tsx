import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloProvider, ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client';

const link = createHttpLink({
  uri: 'http://localhost:8000/graphql',
  // useGETForQueries: true,
  credentials: 'include'
})

const token = localStorage.getItem("accessToken")
export const client = new ApolloClient(
  {
    cache: new InMemoryCache(),
    headers: {
      authorization: `bearer ${token}`,
    },
  link
});

// users list query
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
