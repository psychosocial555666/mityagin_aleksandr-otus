import { User } from "../models/userModel.js";
import { Film } from "../models/filmModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWTSECRET = process.env.JWTSECRET || "nnamdi";

export const resolvers = {
  Query: {
    getUsers: async () => await User.find({}).exec(),
    getUserById: async (_, args) => await User.findById(args.id),
    getFilms: async (_, args, context) => {
      const id = context?.user?.id;
      if (!id) return { error: "Пользователь не авторизован" };
      try {
        const films = await Film.find({ userId: id }).exec();
        return films;
      } catch (e) {
        return { error: e.message };
      }
    },
    getFilmById: async (_, args) => await Film.findById(args.id),
  },
  Mutation: {
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
        return {
          token: jwt.sign({ id: user._id }, JWTSECRET),
          user: user,
        };
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
    createFilm: async (_, args, context) => {
      const id = context?.user?.id;
      if (!id) return { error: "Пользователь не авторизован" };
      const filmData = args.filmData;
      try {
        let film = await Film.create({ ...filmData, userId: id });
        return film;
      } catch (e) {
        return { error: e.message };
      }
    },
    updateFilm: async (_, args, context) => {
      const id = context?.user?.id;
      if (!id) return { error: "Пользователь не авторизован" };
      const filmData = args.filmData;
      const film = await Film.findOneAndUpdate({ _id: filmData.id }, filmData, {
        new: true,
      });
      if (film) {
        return film;
      } else {
        return {
          error: "Фильм не найден",
        };
      }
    },
    deleteFilm: async (_, args, context) => {
      const id = context?.user?.id;
      if (!id) return { error: "Пользователь не авторизован" };
      const filmId = args.id;
      const film = await Film.deleteOne({ _id: filmId });
      if (film && !!film.deletedCount) {
        return { deleted: !!film.deletedCount };
      } else {
        return {
          deleted: !!film.deletedCount,
          error: "Фильм не найден",
        };
      }
    },
  },
};
