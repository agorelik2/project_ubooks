import axios from "axios";

export default {
  getBooksByUser: function () {
    return axios.get("/api/books/uid"); //ALG get books by UID
  },

  // getUserBooks: function () {
  //   return axios.get("/api/books/user"); //ALG User
  // },

  deleteBook: function (id) {
    return axios.delete(`/api/books/${id}`);
  },
  getBooks: function () {
    return axios.get("/api/books");
  },
  getBook: function (id) {
    return axios.get(`/api/books/${id}`);
  },

  updateBook: function (id) {
    return axios.put(`/api/books/${id}`);
  },

  saveBook: function (bookData) {
    console.log(bookData);
    return axios.post("/api/books", bookData);
  },
  getFavorites: function () {
    return axios.get("/api/favorites");
  },
  // Gets one favorite book from mongodb
  getFavorite: function (id) {
    return axios.get("/api/favorites/" + id);
  },
  // Deletes the favorite book with the given id
  deleteFavorite: function (id) {
    return axios.delete("/api/favorites/" + id);
  },
  saveFavorite: function (favoriteData) {
    console.log(favoriteData);
    return axios.post("/api/favorites", favoriteData);
  },

  login: function (userData) {
    return axios.post("/api/users/login", userData);
  },
  getUser: function (id) {
    return axios.get(`/api/users/${id}`);
  },
  // Gets all users
  getUsers: function () {
    return axios.get("/api/users");
  },
  // Saves a user to the database
  signup: function (userData) {
    return axios.post("/api/users/signup", userData);
  },
  logout: function () {
    return axios.get("/api/users/logout");
  },
};
