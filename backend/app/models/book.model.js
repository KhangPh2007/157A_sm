const sql = require("./db.js");

// constructor
const Book = function(book) {
  this.Title = book.Title;
  this.Isbn = book.Isbn;
  this.publishName = book.publishName;
  this.publishDate = book.publishDate;
  this.aID = book.aID;
};


Book.findByTitle = (title, result) => {
  sql.query(`SELECT * FROM Book WHERE Title = "${title}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //return 1 cause of res[0]
      // console.log("found Book: ", res[0]);
      console.log("found Book: ", res);

      //return all value catch
      result(null, res);
      return;
    }

    // not found Book with the id
    result({ kind: "not_found" }, null);
  });
};
Book.createBook = (title, result) => {
  sql.query(`SELECT * FROM Book WHERE Title = "${title}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //return 1 cause of res[0]
      // console.log("found Book: ", res[0]);
      console.log("found Book: ", res);

      //return all value catch
      result(null, res);
      return;
    }

    // not found Book with the id
    result({ kind: "not_found" }, null);
  });
};


Book.findByAuthor = (isbn, result) => {
  sql.query(`SELECT * FROM Book WHERE ISBN = "${isbn}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Book: ", res);
      result(null, res);
      return;
    }

    // not found Book with the author
    result({ kind: "not_found" }, null);
  });
};

Book.findByISBN = (Isbn, result) => {
  sql.query(`SELECT * FROM Book WHERE ISBN = ${Isbn}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Book: ", res);
      result(null, res);
      return;
    }

    // not found Book with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Book;
