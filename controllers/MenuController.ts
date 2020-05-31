import MenuAccessInterface from "./MenuAccessInterface";
import MenuRepo from "./MenuRepo";
import RestaurantReadRepo from "./RestaurantReadRepo";
import RestaurantReadAccessInterface from "./RestaurantReadAccessInterface";
import express, { Application, Request, Response } from "express";

class MenuController {
  private menuRepo: MenuAccessInterface = new MenuRepo();
  private restReadRepo: RestaurantReadAccessInterface = new RestaurantReadRepo();
  public menuRouter = express.Router();
  public path = "/api/menu";

  constructor() {
    this.initializeRouters();
  }

  public initializeRouters() {
    this.menuRouter.get(this.path, this.getAllDishes);
    this.menuRouter.get(this.path + "/:id", this.getDishById);
    this.menuRouter.post(this.path, this.addNewDishToMenu);
    this.menuRouter.put(this.path, this.updateDishById);
    this.menuRouter.delete(this.path + "/:id", this.deleteDishById);
    this.menuRouter.get(this.path+"/:restId", this.getAllMenuByRestId)
  }

  getAllDishes = async (req: Request, res: Response) => {
    const allDishes = await this.menuRepo.getAllDish();
    res.json(allDishes);
  };

  getDishById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const selectedDish = await this.menuRepo.getDishById(id);
    res.json(selectedDish);
  };

  addNewDishToMenu = async (req: Request, res: Response) => {
    const dish = req.body;
    const restaurant = await this.restReadRepo.getRestById(dish.restId);
    if (restaurant) {
      const addedDish = await this.menuRepo.addNewDish(dish, dish.restId);
      res.json(addedDish);
    } else {
      res.status(404).json({
        error: "Invalid Restaurant id"
      });
    }
  };

  updateDishById = async (req: Request, res: Response) => {
    const updateReq = req.body;
    const id = req.params.id;
    await this.menuRepo.updateDish(updateReq, id);
    res.status(200).end();
  };

  deleteDishById = async (req: Request, res: Response) => {
    const id = req.params.id;
    await this.menuRepo.deleteDish(id);
    res.status(204).end();
  };

  getAllMenuByRestId = async (req: Request, res: Response) => {
    const restId = req.params.restId;
    const allMenuForRest = await this.menuRepo.getAllMenuByRestId(restId);
    res.json(allMenuForRest);
  }
}

export default MenuController;
