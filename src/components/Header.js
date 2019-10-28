import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

export default withRouter(function Header(props) {
  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Dgraph GraphQL Blog</div>
        <Link to="/" className="ml1 no-underline black">
          Feed
        </Link>
        <div className="ml1">|</div>
        <Link to="/create" className="ml1 no-underline black">
          Add Article
        </Link>
      </div>
    </div>
  );
});
