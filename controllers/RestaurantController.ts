import RestaurantAccessInterface from "./RestaurantAccessInterface";
import RestaurantRepo from "./RestaurantRepo";
import RestaurantReadRepo from "./RestaurantReadRepo";
import RestaurantReadAccessInterface from "./RestaurantReadAccessInterface";
import express, { Application, Request, Response } from "express";
import mongodb from "mongodb";

class RestaurantController {
  private restRepo: RestaurantAccessInterface = new RestaurantRepo();
  private restReadRepo: RestaurantReadAccessInterface = new RestaurantReadRepo();
  public restRouter = express.Router();
  public path = "/api/restaurant";
  private objectId = mongodb.ObjectID;

  constructor() {
    this.initializeRouters();
  }

  public initializeRouters() {
    this.restRouter.get(this.path, this.getAllRestaurantsFromDb);
    this.restRouter.get(this.path + "/:id", this.getRestByIdDb);
    this.restRouter.post(this.path, this.addNewRestDb);
    this.restRouter.put(this.path, this.updateRestById);
    this.restRouter.delete(this.path + "/:id", this.deleteRestById);
  }

  getAllRestaurantsFromDb = async (req: Request, res: Response) => {
    const allDishes = await this.restRepo.getAllRestaurants();
    res.json(allDishes);
  };

  getRestByIdDb = async (req: Request, res: Response) => {
    const id = req.params.id;
    const selectedRest = await this.restReadRepo.getRestById(id);
    res.json(selectedRest);
  };

  addNewRestDb = async (req: Request, res: Response) => {
    const rest = req.body;
    const addedRest = await this.restRepo.addNewRest(rest);
    res.json(addedRest);
  };

  updateRestById = async (req: Request, res: Response) => {
    const restId = req.params.id;
    const updateRest = req.body;
    await this.restRepo.updateRest(updateRest, restId);
    res.status(200).end();
  };

  deleteRestById = async (req: Request, res: Response) => {
    const id = req.params.id;
    await this.restRepo.deleteRest(id);
    res.status(204).end();
  };
}

export default RestaurantController;
