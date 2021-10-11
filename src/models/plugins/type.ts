import { Types } from "mongoose";

export interface IPlugins {
  _id: Types.ObjectId;
  creator: string;
  category: string;
  description: string;
  link: string;
  thumnail: string;
  page: string;
  price: number;
  tag: string[];
}
