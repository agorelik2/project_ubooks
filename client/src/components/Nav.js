import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import API from "../utils/API";

function Nav(props) {
  const [redirect, setRedirect] = useState("");

  console.log("Navigation -  props.id");
  console.log(props.id);

  //Logout functionality
  const logOut = (e) => {
    e.preventDefault();
    API.logout()
      .then((res) => {
        //console.log(res.data);
        // if (response.status === 200) {
        if (res) {
          console.log("successfully logged out");
          setRedirect("/");
        }
      })
      .catch((error) => {
        console.log("Logout error");
        console.log(error);
      });
  };

  if (redirect) {
    return <Redirect to={{ pathname: redirect }} />;
  } else {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/books">
          URead
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link
                to="/books"
                // style={{ color: "white" }}
                // activestyle={{ color: "red" }}
                className="nav-link"
              >
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/search"
                // style={{ color: "white" }}
                // activestyle={{ color: "red" }}
                className="nav-link"
              >
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/favorites"
                // style={{ color: "white" }}
                // activestyle={{ color: "red" }}
                className="nav-link"
              >
                Favorites
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={logOut}>
                <i className="fas fa-sign-out-alt"></i> Log Out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Nav);
