const { NotFound } = require("../error");
const notFound = (req, res) => {
  const error = new NotFound();
  res.status(error.statusCode).json({ error });
};

module.exports = notFound;
