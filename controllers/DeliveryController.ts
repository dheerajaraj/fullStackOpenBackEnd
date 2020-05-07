import DeliveryService from "../Services/Delivery/DeliveryService";
import DeliveryServiceInterface from "../Services/Delivery/DeliveryServiceInterface";
import OrderUpdateService from "../Services/order/OrderUpdateService";
import OrderUpdateInterface from "../Services/order/OrderUpdateInterface";

class DeliveryController {
  public deliveryRouter = express.Router();
  public path = "/api/delivery";
  private deliveryService: DeliveryServiceInterface = new DeliveryService();
  private orderUpdateService: OrderUpdateInterface = new OrderUpdateService();

  constructor() {
    this.initializeRouters();
  }

  public initializeRouters() {
    this.deliveryRouter(this.path, this.getAllDeliveryPeople);
    this.deliveryRouter(this.path + "/:id", this.getDeliveryPersonById);
    this.deliveryRouter(this.path, this.addNewDeliveryPerson);
  }

  getAllDeliveryPeople = async (req: Request, res: Response) => {
    const deliveryPeople = await this.deliveryService.getAllDrivers();
    res.json(deliveryPeople);
  };

  getDeliveryPersonById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const deliveryPeople = await this.deliveryService.getDeliveryDriversById(
      id
    );
    res.json(deliveryPeople);
  };

  addNewDeliveryPerson = async (req: Request, res: Response) => {
    const driver = req.body;
    const deliveryPerson = await this.deliveryService.addNewDeliveryPerson(
      driver
    );
    res.json(deliveryPerson);
  };

  updateOrderStatus = async (req: Request, res: Response) => {
    let update = req.body;
    if (!update.driverId || !update.orderId) {
      res.status(404).send({ error: "Bad Request! Cannot update" });
    } else {
      let updatedOrder = await orderUpdateService.updateOrderDeliveryStatus(
        update.orderId
      );
      let updateOrderInDelivery = await deliveryService.addOrderDeliveredToDriver(
        update.driverId,
        update.orderId
      );
      if (!updatedOrder || !updateOrderInDelivery) {
        res.status(404).send({
          error:
            "Error! Unable to update delivery status. Contact administrator"
        });
      } else {
        res.status(200).end();
      }
    }
  };
}
