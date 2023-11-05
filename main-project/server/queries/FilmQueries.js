import { Film } from "../models/filmModel.js";

export const FilmQueries = {
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
};