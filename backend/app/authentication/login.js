var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var bCrypt = require('bcrypt-nodejs');
var db = require("../models/db");
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "choreninjastaff";

module.exports = function(passport){
	passport.use('login', new LocalStrategy({
		passReqtoCallback: true
		},
		function (username, password, callback) {
			console.log("username", "password", username, password);
		db.query(`SELECT * FROM User WHERE username = "${username}"`, function (err, user) {
			if (err) {
			return callback(err);
			}
			console.log("userPhuc", user)
			if (!user.length) {
			return callback(null, false, {
        message: "Incorrect username or password.",
      });
			}
			user = user[0]
			console.log("username, password", username, password);
			console.log("user", user);
			//If user exist but wrong password, log the error
			if (!isValidPassword(user, password)) {
				console.log('Invalid Password');
				return callback(null, false, { message: `Invalid Password` });
			}

			//If user and password match, return user from done method (success)
			console.log(user)
			return callback(null, user, { message: `Succesfully login` });
		}
		);
	
}))
	passport.use(
    new JwtStrategy(opts, function (payload, done) {
		db.query(
      `SELECT * FROM User WHERE username = "${payload.username}"`,
      function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      }
    );
    })
  );
	var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.hashed_password);
      };
}