import * as mongoose from "mongoose";
import { Types } from "mongoose";
const schema = mongoose.Schema;

export default mongoose.model(
  "Plugins",
  new schema({
    _id: { type: Types.ObjectId },
    creator: { type: String, default: new Date().toString() },
    category: { type: String, default: "" },
    description: { type: String, default: "" },
    link: { type: String, default: "" },
    thumnail: { type: String, default: "" },
    page: { type: String, default: "" },
    price: { type: Number, default: "" },
    tag: [{ type: String, default: null }],
  })
);
