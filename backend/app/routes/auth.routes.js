var passport = require("passport");
var LocalStrategy = require("passport-local");
var crypto = require("crypto");
var db = require("../models/db");

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    db.query(`SELECT * FROM User WHERE username = "${username}"`, function (err, row) {
        if (err) {
          return cb(err);
        }
        if (!row) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }

        crypto.pbkdf2(
          password,
          row.salt,
          310000,
          32,
          "sha256",
          function (err, hashedPassword) {
            if (err) {
              return cb(err);
            }
            if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
              return cb(null, false, {
                message: "Incorrect username or password.",
              });
            }
            return cb(null, row);
          }
        );
      }
    );
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = (app) => {
  var router = require("express").Router();

  router.post(
    "/login/password",
    passport.authenticate("local", {
      successReturnToOrRedirect: "/",
      failureRedirect: "/login",
      failureMessage: true,
    })
  );

  /* POST /logout
   *
   * This route logs the user out.
   */
  router.post("/logout", function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });

  router.post("/signup", function (req, res, next) {
    console.log(req.body)
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) {
          return next(err);
        }
        db.query(
          `INSERT INTO User (username, hashed_password, salt, admin) VALUES ("${req.body.username}", "${hashedPassword}", "${salt}", ${req.body.admin})`,
          function (err) {
            if (err) {
              return next(err);
            }
            var user = {
              id: this.lastID,
              username: req.body.username,
            };
            req.login(user, function (err) {
              if (err) {
                return next(err);
              }
              res.redirect("/");
            });
          }
        );
      }
    );
  });
  app.use("/api/auth", router);
  // app.use("/api/books", ensureLogIn, router);
};
