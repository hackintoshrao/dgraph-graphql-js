import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker';

// 1
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// 2
const httpLink = createHttpLink({
  uri: 'http://localhost:9000/graphql'
})

// 3
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(), 
  request: operation => {
    operation.setContext({
      fetchOptions: {
        mode: 'no-cors',
      },
    });
  }
})

// 4
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
serviceWorker.unregister();










