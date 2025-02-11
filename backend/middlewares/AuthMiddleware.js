const User = require("../models/UserModel");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  // loads the environment variables from the .env file into process.env, but it only does this if the environment is not "production".
}

const jwt = require("jsonwebtoken");



module.exports.userVerification = (req, res, next) => {
  // Retrieve the token from cookies
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }

  //Decodes the token.,Verifies the token's signature using the secret key.,Ensures the token is not expired.
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      // Find the user in the database using the ID from the token data
      const user = await User.findById(data.id); //(data.id), which was extracted from the JWT payload
      // if (user) return res.json({ status: true, username: user.username }); //username: user.username in the response is to provide the client with the username of the authenticated user.
      // else return res.json({ status: false });
      if (user) {
        req.user = { id: data.id, username: user.username }; // Attach user info to the request object
        next();
      } else {
        return res.status(401).json({ status: false });
      }
    }
  });
};
