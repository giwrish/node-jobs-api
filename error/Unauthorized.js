const { StatusCodes } = require("http-status-codes");
const APIError = require("./APIError");

class Unauthorized extends APIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthorized;
