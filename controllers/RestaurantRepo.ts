import Restaurant from "../models/Restaurant";
var ObjectId = require("mongodb").ObjectID;
import { RestaurantAccessInterface } from "./RestaurantAccessInterface";
import { RestaurantReadAccessInterface } from "./RestaurantReadAccessInterface";

class RestaurantRepo implements RestaurantAccessInterface {
  async getAllRestaurants(): Promise<Object> {
    const restaurant = await Restaurant.find({});
    return restaurant.map(rest => rest.toJSON());
  }

  async addNewRest(rest: any): Promise<Object> {
    const newRest = new Restaurant({
      restName: rest.restName,
      restRatings: rest.restRatings ? rest.restRatings : 0
    });
    const savedRest = await newRest.save();
    return savedRest.toJSON();
  }

  async updateRest(rest: any, restId: string): Promise<Object> {
    const updatedRest = await Restaurant.update(
      { _id: ObjectId(restId) },
      {
        restName: rest.restName,
        restRatings: dish.restRatings ? dish.restRatings : 0
      }
    );
    return updatedDish;
  }

  async deleteRest(id: number) {
    await Restaurant.findByIdAndDelete(id);
  }
}

export default RestaurantRepo;
