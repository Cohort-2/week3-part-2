const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "password";
const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
      message: "User doesn't exists in out database",
    });
  } else {
    var token = jwt.sign(
      {
        username: username,
      },
      jwtPassword
    );
  }
  res.status(200).json({
    message: "User signed in successfully",
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    return res.json({
      success: true,
      Users: ALL_USERS,
    });
  } catch (err) {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
});

// app.get("/exceptUser", function (req, res) {
//   const token = req.headers.authorization;
//   try {
//     const decoded = jwt.verify(token, jwtPassword);
//     const username = decoded.username;
//     res.json({
//       success: true,
//       Users: ALL_USERS.filter((user) => user.username !== username),
//     });
//   } catch (err) {
//     return res.status(403).json({
//       msg: "Invalid Token",
//     });
//   }
// });

app.get("/exceptUser", function (req, res) {
  const token = req.headers.authorization;
  console.log("Token received:", token); // This will show in the console
  if (!token) {
    return res.status(403).json({ msg: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    console.log("Decoded token:", decoded);
    res.json({
      success: true,
      Users: ALL_USERS.filter((user) => user.username !== username),
    });
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(403).json({
      msg: "Invalid Token",
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
