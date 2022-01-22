const { StatusCodes } = require("http-status-codes");
const APIError = require("./APIError");

class NotFound extends APIError {
  constructor() {
    super();
    this.message = "Resource Not Found";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFound;
