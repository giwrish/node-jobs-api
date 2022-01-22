require("dotenv").config();
require("express-async-errors");

const express = require("express");
const dbConnect = require("./database/connection");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>JOBS API</h1>");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await dbConnect(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
  } catch (error) {
    console.log(`something went wrong \n`, error);
  }
};

startServer();
