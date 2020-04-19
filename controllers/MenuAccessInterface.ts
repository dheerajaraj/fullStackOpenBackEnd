export interface MenuAccessInterface {
  getDishById(id: string): Promise<Object>;
  addNewDish(dish: object, restaurantId: string): Promise<Object>;
  updateDish(dish: object, menuId: string): Promise<Object>;
  deleteDish(id: string): void;
  getAllDish(): Promise<Object>;
}
