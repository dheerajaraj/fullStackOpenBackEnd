export interface OrderUpdateInterface {
  updateOrderPreparationStatus(orderId: string): Promise<Object>;
  updateOrderDeliveryStatus(id: String): Promise<Object>;
}
