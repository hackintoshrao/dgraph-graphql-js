import React from "react";

import PostList from "./PostList";
import Header from "./Header";
import CreatePost from "./CreatePost";
import {Router, Switch, Route } from "react-router-dom";
import EditPost from "./EditPost";
import history from "../utils/history"
import PrivateRoute from "./PrivateRoute"
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";

import { useAuth0 } from "../react-auth0-spa";
import ViewQuestion from "./ViewQuestion";

export default function App() {
  const { isAuthenticated, loading, user } = useAuth0();
  console.log("user", user)
  let headers
  if (user !== undefined) {
    headers = {"username": user.email, "email": user.email}
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    headers: headers
  });
  
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

  return (
    <ApolloProvider client={client}>
      <div className="container">
        <Router history={history}>
          <Header />
          <Switch>
            <PrivateRoute exact component={PostList} path="/" />
            <Route exact path="/create" component={CreatePost} />
            <PrivateRoute exact path="/view" component={ViewQuestion} />
            <Route exact path="/edit" component={EditPost} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}