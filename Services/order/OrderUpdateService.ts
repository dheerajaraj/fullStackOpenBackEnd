import OrderPrep from "../../models/OrderPrep";
var ObjectId = require("mongodb").ObjectID;
import OrderUpdateInterface from "./OrderUpdateInterface";

class OrderUpdateService implements OrderUpdateInterface {
  //update order
  async updateOrder(order: any): Promise<Object> {
    const updatedOrder = await OrderPrep.update(
      { _id: ObjectId(order.id) },
      { isPrepared: order.isPrepared, isDelivered: order.isDelivered }
    );
    return updatedOrder;
  }
}

export default OrderUpdateService;
