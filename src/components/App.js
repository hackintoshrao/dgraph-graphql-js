import React from "react";

import PostList from "./PostList";
import Header from "./Header";
import PostView from "./PostView";
import CreatePost from "./CreatePost";
import { Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="container">
      <Header />

      <Switch>
        <Route exact path="/" component={PostList} />
        <Route exact path="/create" component={CreatePost} />
        <Route exact path="/post" component={PostView} />
      </Switch>
    </div>
  );
}

// TODO
//   Add/Delete Author
//   Delete Post
//   Edit/update Post (Like button to add likes)
//   Add search over more fields
//   ACL - Try after building master (new Docker image) 
