var passport = require("passport");
var csrf = require("csurf");
const express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const initPassport = require("./app/authentication/init");

// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

// List of origin(URL host) that backend will trust to allow API call
const whitelist = ["http://localhost:3000"];

// Fix the CORS issue where backend block frontend call
var corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));


const expressSession = require("express-session");

const auth = require("./app/controllers/authentication")(passport);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

app.use(expressSession({ secret: "myChoreNinjaSecretKey" }));

app.use(
  passport.initialize({
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.session());

//Initialize Passport
initPassport(passport);
// Auth
app.use(cookieParser());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to book library." });
});

app.use(passport.initialize());

app.use("/api/auth", auth);
require("./app/routes/book.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
