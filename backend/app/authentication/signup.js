 var LocalStrategy = require('passport-local').Strategy;
 var bCrypt = require('bcrypt-nodejs');
var db = require("../models/db");

module.exports = function(passport)
{
	passport.use('signup', new LocalStrategy({
		passReqtoCallback: true
	},
		function (username, password, done) {
			console.log("username, password", username, password)
			hashedPassword = hash(password);
			db.query(
        `INSERT INTO User (username, hashed_password, salt, admin) VALUES ("${username}", "${hashedPassword}", "", 0)`,
        function (err, newUser) {
          if (err) {
				console.log("Error in Saving user: " + err);
                throw err;
          }
		  console.log("newUser", newUser);
          return done(null, { "username": username });
        }
      );
		})
	);

	var hash = function (password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
}