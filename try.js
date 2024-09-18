const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtpassword = "nainasweetheart";
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://subhajit:nainasweetheart@cluster0.xl3y5.mongodb.net/"
);

const User = mongoose.model("tryjson", {
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// const user = new User({
//   name: "Subh",
//   username: "subh@gmail.com",
//   password: "password",
// });

// user.save();

app.post("/signup", async function (req, res) {
  try {
    const { name, username, password } = req.body;
    // i need to check if the user has given all the required fields

    if (!name || !username || !password) {
      return res.status(400).json({
        msg: "Please provide all the required fields",
      });
    }

    // I need to check if the user already exists
    const existingUser = await User.findOne({
      username: username,
    });
    if (existingUser) {
      return res.status(403).json({
        msg: "User already exists",
      });
    }

    // hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create a new user but before hash the password
    const user = new User({
      name: name,
      username: username,
      password: hashedPassword, // save the hashed password
    });

    await user.save();
    // Once the user is created generate a token and send it back to the user
    // const token = jwt.sign(
    //   {
    //     username: username,
    //     name: name,
    //   },
    //   jwtpassword
    // );

    // console.log(token);

    res.json({
      msg: "User created successfully",
      // token
    });
  } catch (error) {
    console.error("Error during signup:", error);

    // Handle validation errors or other issues
    if (error.code === 11000) {
      return res.status(400).json({
        msg: "Username already exists",
      });
    }

    // Catch any other errors
    res.status(500).json({
      msg: "An error occurred during signup. Please try again.",
    });
  }
});

// login route

app.post("/login", async function (req, res) {
  try {
    // required all the fields to be collected
    const { username, password } = req.body;
    // return back if not provided
    if (!username || !password) {
      return res.status(400).json({
        msg: "Please provide all the required fields",
      });
    }
    // find the user in the database
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(403).json({
        success: false,
        msg: "The user is not found in our database",
      });
    }

    // check if the password is correct
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(403).json({
        success: false,
        msg: "Invalid password",
      });
    }
    // lets create a token and send it back to the user
    const token = jwt.sign(
      {
        username: username,
      },
      jwtpassword
    );
    res.json({
      msg: "Login successful",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "something went wrong with our server",
    });
  }
});

app.get("/protected-route", async function (req, res) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Please provide a token",
    });
  }
  try {
    const decoded = jwt.verify(token, jwtpassword);
    const username = decoded.username;
    res.json({
      msg: "Protected route accessed successfully",
      username,
    });
  } catch (err) {
    res.status(403).json({
      msg: "Invalid token",
    });
  }
});

//global catches

app.use((err, req, res, next) => {
  res.status(404).json({
    msg: "Something is wrong with our server",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
