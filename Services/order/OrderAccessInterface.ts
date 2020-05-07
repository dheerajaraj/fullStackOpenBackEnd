export interface OrderAccessInterface {
  saveOrderForPreparation(): Promise<Object>;
  getOrderById(id: string): Promise<Object>;
  getAllDishesYetToBeDelivered(): Promise<Object>;
  getAllDishesYetToBePrepared(): Promise<Object>;
}
