import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import UpdateBtn from "../components/UpdateBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Nav from "../components/Nav";

function UserBooks(props) {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});

  // Load all books and store them with setBooks
  useEffect(() => {
    loadUserBooks();
  }, []);

  // Loads all books for the user, user populated with books
  function loadUserBooks() {
    console.log("loading user books");
    API.getBooksByUser()
      .then((res) => {
        console.log("////////////");
        console.log(res);

        return setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }

  // Updates a book with a given id, then reloads books from the db
  function updateBook(id) {
    //LOAD FORM with: the book title, author and description
    API.updateBook(id)
      .then((res) => loadUserBooks())
      .catch((err) => console.log(err));
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadUserBooks())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      //Change from save to update !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        description: formObject.description,
      })
        .then((res) => loadUserBooks())
        .catch((err) => console.log(err));
    }
  }

  return (
    <Container fluid>
      <Nav logOut={props.logOut} />
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h1>Update Your Book Review</h1>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
              value={formObject.title}
            />
            <Input
              onChange={handleInputChange}
              name="author"
              placeholder="Location (required)"
              value={formObject.author}
            />
            <TextArea
              onChange={handleInputChange}
              name="description"
              placeholder="Description (Optional)"
              value={formObject.description}
            />
            <FormBtn
              disabled={!(formObject.author && formObject.title)}
              onClick={handleFormSubmit}
            >
              Update Book Review
            </FormBtn>
          </form>
        </Col>
        <Col size="md-6 sm-12">
          <Jumbotron>
            <h1>View All Books Recommended by {props.firstName}</h1>
            <h3>
              <Link to="/books">← Back to All Recommended Books</Link>
            </h3>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map((book) => (
                <ListItem key={book._id}>
                  <Link to={"/books/" + book._id}>
                    <strong>
                      {book.title} by {book.author}
                    </strong>
                  </Link>
                  <DeleteBtn onClick={() => deleteBook(book._id)} />
                  <UpdateBtn onClick={() => updateBook(book._id)} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default UserBooks;
