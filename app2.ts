import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import blogRouter from "./controllers/BlogRouter";
import mongoose from "mongoose";
import middleware from "./utils/middleware";
import config from "./utils/config";
import usersRouter from "./controllers/UserRouter";
const url = config.MONGO_DB_URL;
import morgan from "morgan";

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
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
