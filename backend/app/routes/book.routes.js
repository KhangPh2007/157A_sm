var ensureLogIn = require("connect-ensure-login").ensureLoggedIn;

module.exports = (app) => {
  const books = require("../controllers/book.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", books.create);

  // Retrieve all books
  router.get("/", books.findAll);

  // Retrieve all published books
  router.get("/published", books.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", books.findById);

  // Retrieve a single Tutorial with title
  router.get("/title/:title", books.findByTitle);

  // Retrieve a single Tutorial with author
  router.get("/author/:author", books.findByAuthor);

  // Retrieve a single Tutorial with isbn
  router.get("/author/:isbn", books.findByISBN);

  // Update a Tutorial with a
  router.put("/:id", books.update);

  // Delete a Tutorial with id
  router.delete("/:id", books.delete);

  // Delete all books
  router.delete("/", books.deleteAll);

  app.use("/api/books", router);
  // app.use("/api/books", ensureLogIn, router);
};
