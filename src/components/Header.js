import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

export default withRouter(function Header(props) {
  return (
    <nav className="navbar navbar-expand">
      <span className="navbar-brand">
        Dgraph GraphQL Blog
      </span>

      <div className="navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Feed
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">
              Add Article
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
});
