const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

require("./Employee");

app.use(bodyParser.json());

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

app.post("/send-data", (req, res) => {
  // console.log(req.body)
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    salary: req.body.salary,
    position: req.body.position,
    picture: req.body.picture,
  });
  employee
    .save()
    .then((data) => {
      console.log(data);
      res.send("success");
    })
    .catch((err) => {
      console.log(err);
    });
  // res.send("posted");
});

app.post("/delete", (req, res) => {
  Employee.findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log(data);
      res.send("deleted");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/update", (req, res) => {
  Employee.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    salary: req.body.salary,
    position: req.body.position,
    picture: req.body.picture,
  })
    .then((data) => {
      console.log(data);
      res.send("success")
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log("Server is running listening on port 3000");
});
