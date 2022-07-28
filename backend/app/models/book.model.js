const sql = require("./db.js");

// constructor
const Book = function(book) {
  this.Title = book.Title;
  this.Isbn = book.Isbn;
  this.publishName = book.publishName;
  this.publishDate = book.publishDate;
  this.aID = book.aID;
};

Book.create = (newBook, result) => {
  sql.query("INSERT INTO Books SET ?", newBook, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Book: ", { id: res.insertId, ...newBook });
    result(null, { id: res.insertId, ...newBook });
  });
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

Book.findById = (id, result) => {
  sql.query(`SELECT * FROM Book WHERE aID = "${id}"`, (err, res) => {
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

Book.getAll = (Title, result) => {
  let query = "SELECT * FROM Book";

  if (Title) {
    query += ` WHERE Title LIKE '%${Title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Books: ", res);
    result(null, res);
  });
};

Book.getAllPublished = (result) => {
  sql.query("SELECT * FROM Book WHERE publishName=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Books: ", res);
    result(null, res);
  });
};

Book.updateById = (id, Book, result) => {
  sql.query(
    "UPDATE Books SET Titl= ?, publishName = ? WHERE id = ?",
    [Book.Title, Book.Isbn, Book.publishDate, Book.publishName, Book.aID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Book with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Book: ", { id: id, ...Book });
      result(null, { id: id, ...Book });
    }
  );
};

Book.remove = (id, result) => {
  sql.query("DELETE FROM Book WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Book with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Book with id: ", id);
    result(null, res);
  });
};

Book.removeAll = (result) => {
  sql.query("DELETE FROM Book", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Books`);
    result(null, res);
  });
};

module.exports = Book;
