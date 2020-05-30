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
    this.prepRouter.post(this.path, this.sendOrderToPreparation);
    this.prepRouter.get(
      this.path + "/toPrepare",
      this.findAllOrderToBePrepared
    );
    this.prepRouter.put(this.path + "/:id", this.setOrderToPreparedStatus);
  }

  sendOrderToPreparation = async (req: Request, res: Response) => {
    await this.orderPrepRepo.saveOrderForPreparation();
    res.json();
  };

  findAllOrderToBePrepared = async (req: Request, res: Response) => {
    let dishesToPrepare = await this.orderPrepRepo.getAllDishesYetToBePrepared();
    res.json(dishesToPrepare);
  };

  setOrderToPreparedStatus = async (req: Request, res: Response) => {
    const id = req.params.id;
    let updatedDish = await this.orderUpdateRepo.updateOrderPreparationStatus(
      id
    );
    res.json(updatedDish);
  };

  retrieveAllOrdersPreparedButUndelivered = async (
    req: Request,
    res: Response
  ) => {
    let dishesToBeDelivered = await this.orderPrepRepo.getAllDishesYetToBeDelivered();
    return dishesToBeDelivered;
  };
}

export default OrderPrepController;
