import Delivery from "../../models/Delivery";
var ObjectId = require("mongodb").ObjectID;
import DeliveryServiceInterface from "./DeliveryServiceInterface";

class DeliveryService implements DeliveryServiceInterface {
  async getDeliveryDriversById(id: String): Promise<Object> {
    let driver = await Delivery.findById(id);
    return driver;
  }

  async getAllDrivers(): Promise<Object> {
    let drivers = await Delivery.find({});
    return drivers;
  }

  async createNewDriver(driver: Object): Promise<Object> {
    const deliveryModel = new Delivery({
      orderId: driver.orderId,
      name: driver.name,
      phoneNumber: driver.phoneNumber
    });
    const savedDriver = deliveryModel.save();
    return savedDriver.toJSON();
  }

  async addOrderDeliveredToDriver(
    driverId: string,
    orderId: String
  ): Promise<Object> {
    const deliveryModel = Delivery.update(
      { _id: ObjectId(driverId) },
      { $push: { orderId: orderId } }
    );
  }
}

export default DeliveryService;
