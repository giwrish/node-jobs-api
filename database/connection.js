const mongoose = require("mongoose");

const dbConnect = async (uri) => {
  return await mongoose.connect(uri);
};

module.exports = dbConnect;
