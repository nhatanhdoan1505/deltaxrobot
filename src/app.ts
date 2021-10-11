import express from "express";
import path = require("path");
import cors from "cors";
import * as bodyParser from "body-parser";
import dotenv = require("dotenv");
import { connectMongo } from "./mongo";
import { Router } from "./router";

dotenv.config();

const main = async () => {
  const app = express();
  const router = new Router(app);

  app.use(express.static(path.join(__dirname)));
  app.use(cors("*"));
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  await connectMongo();

  router.route();

  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Server is listenning at port ${port}`));
};

main();
