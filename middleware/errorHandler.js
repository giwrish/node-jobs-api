const { StatusCodes } = require("http-status-codes");
const { APIError } = require("../error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: err.message });
};

module.exports = errorHandler;
