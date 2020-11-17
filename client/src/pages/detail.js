import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import Nav from "../components/Nav";

function Detail(props) {
  const [book, setBook] = useState({});
  const [ruser, setRuser] = useState({});

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  const { id } = useParams();

  useEffect(() => {
    loadBook();
  }, []);

  function loadRuser(uid) {
    API.getUser(uid)
      .then((ures) => setRuser(ures.data))
      .catch((err) => console.log(err));
  }

  function loadBook() {
    API.getBook(id)
      .then((res) => {
        const uid = res.data.user;
        loadRuser(uid);
        setBook(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Nav
        id={props.id}
        firstName={props.firstName}
        lastName={props.lastName}
      />
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>
              {book.title} by {book.author}
            </h1>
            <h3>
              Recommended by {ruser.firstName} {ruser.lastName}
            </h3>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <article>
            <h1>Description</h1>
            <p>{book.description}</p>
          </article>
        </Col>
      </Row>
      <Row>
        <Col size="md-2">
          <Link to="/books">← Back to All Recommended Books</Link>
        </Col>
      </Row>
      <Row>
        <Col size="md-2">
          <Link to="/books/uid">← Back to Books Recommended by you</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Detail;
