const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
const path = require("path");
const cors = require("cors");

const certificate = require("./entities/certificate/Certificate.route");
const user = require("./entities/user/User.route");
const mongoURI = require("./config/keys").mongoURI;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("Connected to the DB"))
  .catch(err => console.log("Error Occured while connecting to DB", err));


// Passport setup
app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/certificates", certificate);
app.use("/api/user", user);

// for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});