// assignment

const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "password";
const mongoose = require("mongoose");
const port = 3000;

mongoose.connect("");

const User = mongoose.model('user'{
  name : String,
  username: String,
  password: String,
})

const app = express();

app.use(express.json());

app.get("/signin", function (req, res) {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
});
app.get("/signup", function (req, res) {});
app.get("/users", function (req, res) {});

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
