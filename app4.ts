//This is the client side application. You use this to send data.
import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import middleware from "./utils/middleware";
import config from "./utils/config";
import loginRouter from "./controllers/login";
const url = config.MONGO_DB_URL;
import morgan from "morgan";
import OrderController from "./controllers/OrderController";
const geoRouter = require("./controllers/GeolocationController");
var orderController = new OrderController();

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
app.use("/api/geo", geoRouter);
app.use("/", orderController.orderRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
