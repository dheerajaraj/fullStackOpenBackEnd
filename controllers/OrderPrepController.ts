import express, { Application, Request, Response } from "express";
import OrderConsumerService from "../Services/order/OrderConsumerService";
import OrderAccessInterface from "../Services/order/OrderAccessInterface";
import OrderUpdateService from "../Services/order/OrderUpdateService";
import OrderUpdateInterface from "../Services/order/OrderUpdateInterface";
import mongodb from "mongodb";

class OrderPrepController {
  public prepRouter = express.Router();
  public path = "/api/preparation";
  private orderPrepRepo: OrderAccessInterface = new OrderConsumerService();
  private orderUpdateRepo: OrderUpdateInterface = new OrderUpdateService();

  constructor() {
    this.initializeRouters();
  }

  public initializeRouters() {
    this.prepRouter.post(this.path);
  }

  sendOrderToPreparation = async (res: Response) => {
    const savedOrder = await this.orderPrepRepo.saveOrderForPreparation();
    res.json(savedOrder);
  };

  markOrderAsPrepared = async (res: Response) => {
    const savedOrder = await this.orderPrepRepo.consumeFromPreparation();
    savedOrder.isPrepared = true;
    const updatedOrder = await this.orderUpdateRepo.updateOrder();
    res.json(updatedOrder);
  };
}
