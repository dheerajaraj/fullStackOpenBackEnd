import OrderPrep from "../../models/OrderPrep";
var ObjectId = require("mongodb").ObjectID;
import OrderUpdateInterface from "./OrderUpdateInterface";

class OrderUpdateService implements OrderUpdateInterface {
  //update order
  async updateOrderDeliveryStatus(orderId: string): Promise<Object> {
    const updatedOrder = await OrderPrep.update(
      { _id: ObjectId(orderId) },
      { isDelivered: true }
    );
    return updatedOrder;
  }

  async updateOrderPreparationStatus(id): Promise<Object> {
    let updatedDish = await OrderPrep.update(
      { _id: ObjectId(id) },
      {
        isPrepared: true
      }
    );
    return updatedDish;
  }
}

export default OrderUpdateService;
