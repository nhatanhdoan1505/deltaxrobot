import { IPlugins } from "../plugins/type";
import { Types } from "mongoose";

export interface IUsers {
  _id: Types.ObjectId;
  name: string;
  password: string;
  pluginsDowload: IPlugins[];
  pluginsUpload: IPlugins[];
  email: string;
  phone: string;
  isVerify: boolean;
  verifiedCode: string;
}
