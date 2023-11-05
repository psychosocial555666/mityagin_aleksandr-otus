import { User } from "../models/userModel.js";

export const UserQueries = {
  getUsers: async () => await User.find({}).exec(),
  getUserById: async (_, args) => await User.findById(args.id),
};