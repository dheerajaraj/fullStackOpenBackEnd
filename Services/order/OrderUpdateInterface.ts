export interface OrderUpdateInterface {
  updateOrder(order: any, orderId: string): Promise<Object>;
}
