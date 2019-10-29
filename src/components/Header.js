import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

export default withRouter(function Header(props) {
  return (
    <nav class="navbar navbar-expand">
      <span class="navbar-brand">Dgraph GraphQL Blog</span>

      <div class="navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link to="/" className="nav-link">
              Feed
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/create" className="nav-link">
              Add Article
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
});
