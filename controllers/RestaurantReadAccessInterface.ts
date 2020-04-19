export interface RestaurantReadAccessInterface {
  getRestById(id: string): Promise<Object>;
}
