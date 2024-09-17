// assignment for today

const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "password";
const port = 3000;

const app = express();

app.use(express.json());

const ALL_USERS = [
  {
    username: "subh@gmail.com",
    password: "password",
    name: "Subh",
  },
  {
    username: "naina@gmail.com",
    password: "password",
    name: "Naina",
  },
  {
    username: "lakshay@gmail.com",
    password: "password",
    name: "Lakshay",
  },
];

function userExists(username, password) {
  // write the logic to return true or false if this users exists
  // In ALL_USERS array
  let userExists = false;
  // for (let i = 0; i < ALL_USERS.length; i++) {
  //   if (
  //     ALL_USERS[i].username === username &&
  //     ALL_USERS[i].password === password
  //   ) {
  //     userExists = true;
  //   }
  // }

  // write this logic using find function
  const user = ALL_USERS.find((user) => {
    return user.username === username && user.password === password;
  });

  if (user) {
    userExists = true;
  }

  return userExists;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesn't exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username
    res.json({
      success: true,
      Users: ALL_USERS,
    });
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

// used global catches

app.use(function (err, req, res, next) {
  res.status(404).json({
    msg: "Route not found",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
