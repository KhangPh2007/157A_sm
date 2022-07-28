var ensureLogIn = require("connect-ensure-login").ensureLoggedIn;

module.exports = (app) => {
  const books = require("../controllers/book.controller.js");

  var router = require("express").Router();

  // Create a new Book
  router.post("/", books.createBook);

  // Retrieve a single Tutorial with title
  router.get("/title/:title", books.findByTitle);

  // Retrieve a single Tutorial with author
  router.get("/author/:author", books.findByAuthor);

  // Retrieve a single Tutorial with isbn
  router.get("/author/:isbn", books.findByISBN);

  app.use("/api/books", router);
  // app.use("/api/books", ensureLogIn, router);
};
