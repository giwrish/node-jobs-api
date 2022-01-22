const { StatusCodes } = require("http-status-codes");
const { APIError } = require("../error");

const errorHandler = (err, req, res, next) => {
  let error = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Somethnig went wrong. We don't what"
  };

  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err.name === "CastError") {
    error.statusCode = StatusCodes.BAD_REQUEST;
    error.message = `Invalid id format ${err.value}`;
  }

  if (err.name === "ValidationError") {
    error.statusCode = StatusCodes.BAD_REQUEST;
    error.message = Object.values(err.errors)
      .map((x) => x.message)
      .join(", ");
  }

  if (err.code && err.code === 11000) {
    error.statusCode = StatusCodes.BAD_REQUEST;
    error.message = `Duplicate ${Object.keys(err.keyValue)} ${Object.values(
      err.keyValue
    )} found.`;
  }

  return res.status(error.statusCode).json({ error });
};

module.exports = errorHandler;
