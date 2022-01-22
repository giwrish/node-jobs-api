const { StatusCodes } = require("http-status-codes");
const APIError = require("./APIError");

class NotFound extends APIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFound;
