import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import PostList from './PostList'
import Header from './Header'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/create" component={PostList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
