const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../error");

const authenticate = async (req, res, next) => {
  //check for auth header
  const authHeader = req.headers.authorization;
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    throw new Unauthorized("Missing access_token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = {
      userId: payload.userId,
      name: payload.name,
      email: payload.email
    };
    next();
  } catch (error) {
    throw new Unauthorized("Invalid access_token" + JSON.stringify(error));
  }
};

module.exports = authenticate;
