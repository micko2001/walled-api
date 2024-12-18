const jwt = require("jsonwebtoken");

function generateAccesToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
}

module.exports = { generateAccesToken };
