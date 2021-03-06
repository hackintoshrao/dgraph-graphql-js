import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa"

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const history = useHistory();

  const filterPosts = (filterValue) => {
        history.push({
            pathname: '/posts',
            search: `?search=${filterValue}`,
        })
  }

  return (
    <React.Fragment>
     {isAuthenticated && (<nav className="navbar navbar-expand">
     <span className="navbar-brand"><h3>Welcome!</h3></span>
      <div className="navbar-collapse navbar-direction">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Feed
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">
              Add Question
            </Link>
          </li>
          <li className="nav-item">
            <button type="button" className="btn btn-link" onClick={() => logout()}>Log out</button>
          </li>
          <li className="nav-item">
            <input
              id="search"
              className="form-control"
              onChange={e => filterPosts(e.target.value)}
              type="text"
              placeholder="Search"
            />
          </li>
        </ul>
      </div>
    </nav>
    )}
    </React.Fragment>
  );
};

export default Header;
