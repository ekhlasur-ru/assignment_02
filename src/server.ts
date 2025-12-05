import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const app = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! from Ekhlasur Rahman");
});

app.listen(port, () => {
  console.log(`Server is Running On PORT ${process.env.PORT}`);
});
