import Menu from "../models/Menu";
var ObjectId = require("mongodb").ObjectID;
import { MenuAccessInterface } from "./MenuAccessInterface";

class MenuRepo implements MenuAccessInterface {
  async getAllDish(): Promise<Object> {
    const menuList = await Menu.find({});
    return menuList.map(menu => menu.toJSON());
  }

  async getDishById(id: string): Promise<Object> {
    const selectedMenu = await Menu.findById(id);
    return selectedMenu.toJSON();
  }

  async addNewDish(dish: any, restaurantId: string): Promise<Object> {
    const newDish = new Menu({
      dishName: dish.dishName,
      price: dish.price,
      restId: restaurantId
    });
    const savedDish = await newDish.save();
    return savedDish.toJSON();
  }

  async updateDish(dish: any, menuId: string): Promise<Object> {
    const updatedDish = await Menu.update(
      { _id: ObjectId(menuId) },
      { dishName: dish.name, price: dish.price }
    );
    return updatedDish;
  }

  async deleteDish(id: string) {
    await Menu.findByIdAndDelete(id);
  }
}

export default MenuRepo;
