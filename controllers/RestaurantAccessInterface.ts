export interface RestaurantAccessInterface {
  getRestById(id: string): Promise<Object>;
  addNewRest(dish: object): Promise<Object>;
  updateRest(dish: object, restId: string): Promise<Object>;
  deleteRest(id: string): void;
  getAllRestaurants(): Promise<Object>;
}
