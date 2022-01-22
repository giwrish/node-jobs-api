require("dotenv").config();
require("express-async-errors");

// security packages
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");

const express = require("express");
const dbConnect = require("./database/connection");
const app = express();

const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");
const authenticate = require("./middleware/authentication");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticate, jobsRouter);

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
