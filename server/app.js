const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

require("./Employee");

const dbUrl = process.env.DB_URL;

const Employee = mongoose.model("employee");

mongoose.connect(dbUrl, {

  useNewURLParser: true,
  useUnifiedtopology: true,
});
// console.log(dbUrl)

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

app.get("/", (req, res) => {
  res.send("Welcome to app");
});

app.listen(3000, () => {
  console.log("Server is running listening on port 3000");
});
