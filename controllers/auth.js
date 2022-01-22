const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unauthorized } = require("../error");
const User = require("../model/User");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ access_token: user.getToken() });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    throw new BadRequest("Missing email or password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized(
      `User is not registered with us by email id ${email}`
    );
  }

  const isPasswordCorrect = await user.validatePassword(password);

  if (!isPasswordCorrect) {
    throw new Unauthorized("Invalid credentials");
  }

  res.status(StatusCodes.OK).json({ access_token: user.getToken() });
};

module.exports = {
  login,
  register
};
