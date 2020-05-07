import OrderPrep from "../../models/OrderPrep";
const orderqueue = require("amqplib/callback_api");
import OrderAccessInterface from "./OrderAccessInterface";
import config from "../../utils/config";
var ObjectId = require("mongodb").ObjectID;

class OrderConsumerService implements OrderAccessInterface {
  bail(err) {
    console.error(err);
    process.exit(1);
  }

  // create and process order
  async saveOrderForPreparation(): Promise<Object> {
    orderqueue.connect(config.MSG_QUEUE, function(err, conn) {
      if (err != null) bail(err);
      var ok = conn.createChannel(on_open);
      function on_open(err, ch, flag) {
        if (err != null) bail(err);
        ch.assertQueue("tasks");
        console.log("flag: ");
        console.log(flag);
        ch.consume("tasks", function(order) {
          if (order !== null) {
            console.log(order.content.toString());
            var myorder = JSON.parse(order.content.toString());
            const orderPrep = new OrderPrep({
              restId: myorder.restId,
              menuIds: myorder.menuIds,
              totalPrice: myorder.totalPrice,
              isPrepared: false,
              isDelivered: false
            });
            orderPrep.save().then(savedOrder => {
              console.log("saved!");
              console.log(savedOrder);
              ch.ack(order);
            });
          }
        });
      }
    });
  }

  async getAllDishesYetToBePrepared(): Promise<Object> {
    let dishesToBePrepared = await OrderPrep.find({ isPrepared: false }).sort({
      timeStamp: "descending"
    });
    return dishesToBePrepared;
  }

  // read order
  async getOrderById(id: string): Promise<Object> {
    const selectedOrder = await OrderPrep.findById(id);
    return selectedOrder.toJSON();
  }
}

export default OrderConsumerService;
