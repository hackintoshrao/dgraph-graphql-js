import React from "react";

import PostList from "./PostList";
import Header from "./Header";
import PostView from "./ViewPost";
import CreatePost from "./CreatePost";
import {Router, Switch, Route } from "react-router-dom";
import EditPost from "./EditPost";
import history from "../utils/history"
import { useAuth0 } from "../react-auth0-spa";
import PrivateRoute from "./PrivateRoute"

export default function App() {
  const { loading, user } = useAuth0();
  console.log("user", user)
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Router history={history}>
      <Header />
      <Switch>
        <PrivateRoute exact path="/" component={PostList} />
        <Route exact path="/create" component={CreatePost} />
        <Route exact path="/view" component={PostView} />
        <Route exact path="/edit" component={EditPost} />
      </Switch>
      </Router>
    </div>
  );
}