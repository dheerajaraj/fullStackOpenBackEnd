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
    orderqueue.connect(config.MSG_QUEUE, function(err, conn) {
      if (err != null) bail(err);
      function publishDelivery(conn, id) {
        var ok = conn.createChannel(on_open);
        function on_open(err, ch) {
          if (err != null) bail(err);
          ch.assertQueue("prepQueue");
          ch.sendToQueue("prepQueue", Buffer.from(result));
        }
      }
    });
    return updatedDish;
  }
}

export default OrderUpdateService;
