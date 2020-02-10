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
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

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
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

