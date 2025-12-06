import app from "./app";
import configENV from "./config";

app.listen(() => {
  console.log(`Server is Running On PORT ${configENV.port}`);
});
