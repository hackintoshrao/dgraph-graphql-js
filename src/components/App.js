import React from "react";
import "../styles/App.css";
import PostList from "./PostList";
import Header from "./Header";
import Postbox from "./Postbox";
import { Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/create" component={Postbox} />
        </Switch>
      </div>
    </div>
  );
}
