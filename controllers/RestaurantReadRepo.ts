import Restaurant from "../models/Restaurant";
var ObjectId = require("mongodb").ObjectID;
import { RestaurantReadAccessInterface } from "./RestaurantReadAccessInterface";

class RestaurantReadRepo implements RestaurantReadAccessInterface {
  async getRestById(id: string): Promise<Object> {
    const selectedRest = await Restaurant.findById(id);
    return selectedRest.toJSON();
  }
}

export default RestaurantReadRepo;
