const { StatusCodes } = require("http-status-codes");
const APIError = require("./APIError");

class BadRequest extends APIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
