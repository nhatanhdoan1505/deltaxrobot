import * as mongoose from "mongoose";
import { Types } from "mongoose";
const schema = mongoose.Schema;

export default mongoose.model(
  "Users",
  new schema({
    _id: { type: Types.ObjectId },
    name: { type: String, default: "" },
    password: { type: String, default: "" },
    pluginsUpload: [{ type: Object, default: {} }],
    pluginDownload: [{ type: Object, default: {} }],
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    isVerify: { type: Boolean, default: false },
    verifiedCode: { type: String, default: "" },
  })
);
