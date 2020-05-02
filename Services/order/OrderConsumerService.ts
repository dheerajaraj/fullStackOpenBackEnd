import OrderPrep from "../models/OrderPrep";
const orderqueue = require("amqplib/callback_api");
import OrderAccessInterface from "./OrderAccessInterface";
import config from "../../utils/config";

class OrderConsumerService implements OrderAccessInterface {
  private savedOrderFromDb: Object;

  private getSavedOrderFromDb(): Object {
    return this.savedOrderFromDb;
  }

  private setSavedOrderFromDb(savedOrder: Object) {
    this.savedOrderFromDb = savedOrder;
  }
  // create and process order
  async saveOrderForPreparation(): Promise<Object> {
    orderqueue.connect(config.MSG_QUEUE, function(err, conn) {
      if (err != null) bail(err);
      let savedOrder = await consumeOrderFromQueue(conn);
      setSavedOrderFromDb(savedOrder);
    });
    return await getSavedOrderFromDb();
  }

  bail(err) {
    console.error(err);
    process.exit(1);
  }

  async consumeOrderFromQueue(conn): Object {
    var ok = conn.createChannel(on_open);
    function on_open(err, ch) {
      if (err != null) bail(err);
      ch.assertQueue("tasks");
      ch.consume("tasks", function(order) {
        if (order !== null) {
          console.log(order.content.toString());
          var myorder = order.content;
          const orderPrep = new OrderPrep({
            restId: myorder.restId,
            menuIds: myorder.menuIds,
            totalPrice: myorder.totalPrice,
            isPrepared: false,
            isDelivered: false
          });
          const savedOrder = await orderPrep.save();
          publishOrderToPrepQueue(savedOrder);
          ch.ack(order);
          return savedOrder.toJSON();
        }
      });
    }
  }

  publishOrderToPrepQueue(order: Object) {
    orderqueue.connect(config.MSG_QUEUE, function(err, conn) {
      if (err != null) bail(err);
      publishToPrepQueue(conn, JSON.stringify(order));
    });
  }

  publishToPrepQueue(conn, order: string) {
    conn.createChannel(on_open);
    function on_open(err, ch) {
      if (err != null) bail(err);
      ch.assertQueue("prepQueue");
      ch.sendToQueue("prepQueue", Buffer.from(JSON.stringify(order)));
    }
  }

  // read order
  async getOrderById(id: string): Promise<Object> {
    const selectedOrder = await OrderPrep.findById(id);
    return selectedOrder.toJSON();
  }

  consumeFromPreparation(): Object {
    orderqueue.connect(config.MSG_QUEUE, function(err, conn) {
      if (err != null) bail(err);
      consumeFromPreparationAndPublishToDeliveryQueue(conn);
    });
  }

  //Delivery Queue is yet to be implemented.
  consumeFromPreparationAndPublishToDeliveryQueue(conn): Object {
    var ok = conn.createChannel(on_open);
    function on_open(err, ch) {
      if (err != null) bail(err);
      ch.assertQueue("prepQueue");
      ch.consume("prepQueue", function(order) {
        if (order !== null) {
          console.log(order.content.toString());
          ch.ack(order);
          return order.content;
        }
      });
    }
  }
}

export default OrderConsumerService;
