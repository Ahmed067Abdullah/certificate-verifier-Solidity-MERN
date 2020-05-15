const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const certificate = require("./entities/certificate/Certificate.route");
const mongoURI = require("./config/keys").mongoURI;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(mongoURI, {useNewUrlParser: true})
  .then(() => console.log("Connected to the DB"))
  .catch(err => console.log("Error Occured while connecting to DB", err));

app.use("/api/certificates", certificate);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});