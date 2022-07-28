var login = require('./login');
var signup = require('./signup');
var db = require("../models/db");

module.exports = function(passport){
    //Serialize and Deserialize to keep the user credentials private
    passport.serializeUser(function (user, done){
        done(null, user.username);
    });

    passport.deserializeUser(function (username, done) {
      db.query(
        `SELECT * FROM User WHERE username = "${username}"`,
        function (err, user) {
          if (err) {
            return cb(err);
          }
          console.log("deserializing user: ", user);
          done(err, user);
        }
      );
    });

    login(passport);
    signup(passport);

}