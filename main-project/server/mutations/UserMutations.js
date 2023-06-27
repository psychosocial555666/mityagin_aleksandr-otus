import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWTSECRET = process.env.JWTSECRET || "nnamdi";

export const UserMutations = {
  createUser: async (_, args) => {
    const saltRounds = 10;
    const userData = args.userData;
    const { login, password } = userData;
    try {
      const userFind = await User.findOne({ login });
      if (!userFind) {
        const hash = bcrypt.hashSync(password, saltRounds);
        const user = { ...userData, password: hash };
        let response = await User.create(user);
        return { user: response };
      } else {
        return {
          error: "Пользователь с таким логином уже существует",
        };
      }
    } catch (e) {
      return { error: e.message };
    }
  },
  updateUser: async (_, args, context) => {
    const id = context?.user?.id;
    if (!id) return { error: "Пользователь не авторизован" };
    let { userData } = args;
    const { password } = userData;
    if (password) {
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds);
      userData = { ...userData, password: hash };
    }
    const user = await User.findOneAndUpdate({ _id: id }, userData, {
      new: true,
    });
    if (user) {
      return { user };
    } else {
      return {
        error: "Пользователь не найден",
      };
    }
  },
  login: async (_, args, context) => {
    const id = context?.user?.id;
    if (id) {
      const user = await User.findOne({ _id: id });
      if (user) {
        return {
          token: jwt.sign({ id: user._id }, JWTSECRET),
          user: user,
        };
      }
    }
    const { userLogin, userPassword } = args;
    try {
      const user = await User.findOne({ login: userLogin });
      if (user) {
        const validPassword = await bcrypt.compare(
          userPassword,
          user.password
        );
        if (validPassword) {
          const result = {
            token: jwt.sign({ id: user._id }, JWTSECRET),
            user: user,
          };
          return result;
        } else {
          return {
            error: "Неверный пароль",
          };
        }
      } else {
        return {
          error: "Пользователь не найден",
        };
      }
    } catch (e) {
      return { error: e.message };
    }
  },
}