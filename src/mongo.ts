import { ConnectOptions } from "mongoose";
import mongoose = require("mongoose");

type ConnectionOptionsExtend = {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
};

const options: ConnectOptions & ConnectionOptionsExtend = {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  user: "admin",
  pass: "123456",
  dbName: "deltaX",
};

export const connectMongo = async () => {
  mongoose
    .connect("mongodb://admin:123456@3.0.54.169:27017", options)
    .then(() => {
      console.log("Connect DB");
    })
    .catch((err) => console.log({ err }));
};
