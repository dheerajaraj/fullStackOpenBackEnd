import config from "./utils/config";
import app from "./app4";

app.listen(config.CLIENT_SERVICE_PORT, () => {
  console.log(`Server running on port ${config.CLIENT_SERVICE_PORT}`);
});
