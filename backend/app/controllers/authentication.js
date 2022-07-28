var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var db = require("../models/db");

module.exports = function(passport){
    //Handle login page
    router.post('/signin', function (req, res, next) {
        passport.authenticate('login', { session: false }, (err, user, info) => {
            console.log("err", "user", err, user);
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.send(err);
                }
				// generate a signed son web token with the contents of user object and return it in the response
				console.log(user)
                const token = jwt.sign({_id: user._id}, 'choreninjastaff');
                return res.json({ user, token });
            });
        })(req, res);
	});

    //Handle registration post
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/api/auth/aftersignup',
        failureRedirect: '/api/auth/failure',
    }));

    //get loggedin
    router.get('/getLoggedIn', function(req, res){
        console.log("req.isAuthenticated()", req.isAuthenticated());
        console.log("req", req);
        db.query(
              `SELECT * FROM User WHERE username = "${req.user.username}"`,
              function (err, user) {
                if (err) res.status(500).send(null)
                else res.status(200).send({user});
              }
            );
    });

    //get homepage
    router.get('/aftersignup', function(req, res){
        res.status(200).send({ message: "Thanks for signup" });
    });

    
    //Handle Logout
    router.get('/signout', function(req, res){
        req.logout();
        res.redirect('/');
    })

    //Handle Logout
    router.get('/failure', function(req, res){
        res.status(500).send({ message: "Failure to login" });
    })

    return router;
}