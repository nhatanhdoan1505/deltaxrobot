import { IUsers } from "./type";
import { Types } from "mongoose";
import Users from "./schema";

export class UsersService {
  async createUsers(params: any) {
    const _session = new Users({
      ...params,
      _id: new Types.ObjectId(),
    });
    return await _session.save();
  }

  async filterUsers(query): Promise<IUsers[]> {
    return await Users.find(query).lean();
  }

  async findUsers(query): Promise<IUsers> {
    return await Users.findOne(query).lean();
  }

  async updateUsers(query, params): Promise<IUsers> {
    return await Users.findOneAndUpdate(query, params, { new: true }).lean();
  }

  async deleteUsers(query) {
    return await Users.deleteMany(query);
  }
}
