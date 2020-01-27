import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/index.css";
import App from "./components/App";

// 1
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter } from "react-router-dom";

// 2
const httpLink = createHttpLink({
  uri: "http://localhost:8080/graphql"
});

// 3
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  request: operation => {
    operation.setContext({
      fetchOptions: {
        mode: "no-cors"
      }
    });
  },
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    }
  }
});

// 4
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
