export interface DeliveryServiceInterface {
  getDeliveryDriversById(id: String): Promise<Object>;
  getAllDrivers(): Prommise<Object>;
  createNewDriver(driver: object): Promise<Object>;
  addOrderDeliveredToDriver(driverId: string, orderId: String): Promise<Object>;
}
