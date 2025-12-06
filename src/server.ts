import app from "./app";
import configENV from "./config";

app.listen(configENV.port, () => {
  console.log(` Server running on http://localhost:${configENV.port}`);
});
