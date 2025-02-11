if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
/* 
 header typically consists of two parts: the type of token (JWT) and the signing algorithm being used (HMAC SHA256 by default).
payload of the token contains the user ID ({ id }). and standard claims such as iat (issued at) and exp (expiration time).
 signature contains  encoded header, the encoded payload, a secret (in this case, process.env.TOKEN_KEY)
This approach ensures that only clients with a valid token can access protected routes, 
and the token can be verified on the server side using the same secret key. */