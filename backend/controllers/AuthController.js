const User = require("../models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;// req.body contains the data sent by the client in the body of an HTTP request.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });
    const token = createSecretToken(user._id);//signs the token with a secret key (TOKEN_KEY)
    res.cookie("token", token, {
      withCredentials: true,//ensures that the cookie is sent with cross-site requests
      httpOnly: true,//This flag makes the cookie inaccessible to JavaScript in the browser
    });
    res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;// when a user submits a login form, the data (email and password) is sent in the request body.request body contains data sent from the client to the server.
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("Login attempt with email:", email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "user not found" });
    }
    const auth = await bcrypt.compare(password, user.password);//rovided password with the stored hashed password using bcrypt.
    if (!auth) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Incorrect email or password" });
    }
    console.log("User authenticated");
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      username: user.username
      // email: user.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
