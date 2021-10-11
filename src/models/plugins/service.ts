import { IPlugins } from "./type";
import { Types } from "mongoose";
import Plugins from "./schema";

export class PluginsService {
  async createPlugins(params: any) {
    const _session = new Plugins({
      ...params,
      _id: new Types.ObjectId(),
    });
    return await _session.save();
  }

  async filterPlugins(query): Promise<IPlugins[]> {
    return await Plugins.find(query).lean();
  }

  async findPlugins(query): Promise<IPlugins> {
    return await Plugins.findOne(query).lean();
  }

  async updatePlugins(query, params): Promise<IPlugins> {
    return await Plugins.findOneAndUpdate(query, params, { new: true }).lean();
  }

  async deletePlugins(query) {
    return await Plugins.deleteMany(query);
  }
}
