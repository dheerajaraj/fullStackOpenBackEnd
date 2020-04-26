import config from "./utils/config";
import app from "./app3";

app.listen(config.ORDER_CONSUMER_PORT, () => {
  console.log(`Server running on port ${config.ORDER_CONSUMER_PORT}`);
});
