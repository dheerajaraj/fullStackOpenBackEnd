const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const blogRouter = require("./controllers/BlogRouter");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const config = require("./utils/config");
const usersRouter = require("./controllers/UserRouter");
const loginRouter = require("./controllers/login");
const url = config.MONGO_DB_URL;
var morgan = require("morgan");

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log("Connected to MongoDB!");
  })
  .catch(error => {
    console.log("Error connecting to MongoDB: " + error.message);
  });

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));
app.use(
  morgan(function(tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body)
    ].join(" ");
  })
);

app.use(middleware.tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
