require("dotenv").config();
require("express-async-errors");

const express = require("express");
const dbConnect = require("./database/connection");
const app = express();

const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

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
