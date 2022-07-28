const Book = require("../models/book.model.js");




// Find a single book by Title
exports.findByTitle = (req, res) => {
      console.log("req.isAuthenticated()", req.isAuthenticated());
      console.log("req", req);
  Book.findByTitle(req.params.title, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found book with title ${req.params.title}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving book with title " + req.params.title
        });
      }
    } else res.send(data);
  });
};

//For create new book
exports.createBook = (req, res) => {
      console.log("req.isAuthenticated()", req.isAuthenticated());
      console.log("req", req);
  Book.createBook(req.params.title, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found book with title ${req.params.title}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving book with title " + req.params.title
        });
      }
    } else res.send(data);
  });
};

// Find a single book by author
exports.findByAuthor = (req, res) => {
  Book.findByAuthor(req.params.author, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found book with author ${req.params.author}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving book with author " + req.params.author,
        });
      }
    } else res.send(data);
  });
};
// Find a single book by isbn
exports.findByISBN = (req, res) => {
  Book.findByISBN(req.params.Isbn, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found book with ISBN ${req.params.Isbn}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving book with ISBN " + req.params.Isbn,
        });
      }
    } else res.send(data);
  });
};

// find all published books
exports.findAllPublished = (req, res) => {
  Book.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
    else res.send(data);
  });
};
