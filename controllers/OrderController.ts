import express, { Application, Request, Response } from "express";
const callback_api = require("amqplib/callback_api");
import publishToQueue from "../Services/OrderProducerService";
import axios from "axios";
import RestaurantReadRepo from "./RestaurantReadRepo";

class OrderController {
  public orderRouter = express.Router();
  public path = "/api/order";
  constructor() {
    this.initializeRouters();
  }

  public initializeRouters() {
    this.orderRouter.post(this.path, this.addNewOrder);
  }

  addNewOrder = async (req: Request, res: Response) => {
    const restaurantReadRepo = new RestaurantReadRepo();
    const restaurant = restaurantReadRepo.getRestById(req.restId);
    if (restaurant && restaurant.placeId == req.placeId) {
      callback_api.connect(
        "amqp://sqkuhegd:RZNx8RNIKSJjrWwmKk8OmzQ60kCRZ2Zn@gull.rmq.cloudamqp.com/sqkuhegd",
        function(err, conn) {
          if (err != null) fns.bail(err);
          publishToQueue(conn, JSON.stringify(req.body));
        }
      );
      res.status(200).end();
    } else {
      res
        .status(400)
        .send({ error: "Incorrect restaurant id or place id or menu id!" });
    }
  };
}

export default OrderController;
