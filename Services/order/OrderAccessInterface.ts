export interface OrderAccessInterface {
  saveOrderForPreparation(): Promise<Object>;
  getOrderById(id: string): Promise<Object>;
}
