import React, { useEffect, useState } from "react";
import Api from "../utils/API";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

//SignUp component
function SignUp(props) {
  // const classes = useStyles();

  console.log("****************** Props from signup ************");
  console.log(props.firstName);

  //Redirect hook
  const [redirect, setRedirect] = useState("");

  //Hook for email
  const [email, setEmail] = useState("");

  //handle input for email
  const handleEmailInput = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  //Password hook
  const [password, setPassword] = useState("");

  //Handle input for password
  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  //firstName hook
  const [firstName, setFirstName] = useState("");

  //Handle input for first name
  const handleFirstNameInput = (event) => {
    setFirstName(event.target.value);
    console.log(firstName);
  };

  //Last name hook
  const [lastName, setLastName] = useState("");

  //Handle input for last name
  const handleLastNameInput = (event) => {
    setLastName(event.target.value);
    console.log(lastName);
  };

  //Saving person in database
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("clicked");
    Api.signup({
      firstName,
      lastName,
      email,
      password,
    })
      .then((response) => {
        console.log("signup response: ");
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          props.updateUser(response.data);
          //props.id = response.data._id;
          console.log(props.id);
          console.log("~~~~~~~~~~~~~~~)");
          console.log("response data from SignUp 69");
          console.log(response.data);
          // update the state to redirect to books
          setRedirect("/books");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //If redirect is true redirect, or else show signin page
  if (redirect) {
    return <Redirect to={{ pathname: redirect }} />;
  } else {
    //show sign-up page
    return (
      <Container>
        <div className="section-content m-5">
          <h1 className="section-header">
            Share your favorite books with{" "}
            <span
              className="content-header wow fadeIn "
              data-wow-delay="0.2s"
              data-wow-duration="2s"
            >
              {" "}
              <br></br>
              URead
            </span>
          </h1>
          <h3 className="subt">sign up and start sharing</h3>
        </div>
        <div className="container w-50 shadow-lg round flex-d ">
          <div className="row justify-content-center p-5 ">
            <div className="contact-section col-lg-6 p-0 m-0 ">
              <form>
                <div className="form-group">
                  <label className="form-label" htmlFor="firstName">
                    First Name:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="firstName"
                    placeholder="John"
                    name="firstName"
                    value={firstName}
                    onChange={handleFirstNameInput}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lastName">
                    Last Name:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="lastName"
                    placeholder="Smith"
                    name="lastName"
                    value={lastName}
                    onChange={handleLastNameInput}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    E-mail:
                  </label>

                  <input
                    className="form-control"
                    type="text"
                    id="email"
                    placeholder="john@abc.com"
                    name="email"
                    value={email}
                    onChange={handleEmailInput}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Password:
                  </label>
                  <input
                    className="form-control"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordInput}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleSubmit}
                >
                  {" "}
                  Sign up
                </button>
                <br />
                <Link to={"/signin"}>Sign In Here </Link>
              </form>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default withRouter(SignUp);
