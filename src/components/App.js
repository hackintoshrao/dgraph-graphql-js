import React from "react";

import PostList from "./PostList";
import Header from "./Header";
import CreatePost from "./CreatePost";
import { Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div class="container">
      <Header />

      <Switch>
        <Route exact path="/" component={PostList} />
        <Route exact path="/create" component={CreatePost} />
      </Switch>
    </div>
  );
}
