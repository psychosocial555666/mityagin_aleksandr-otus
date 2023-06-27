import { Film } from "../models/filmModel.js";

export const FilmMautations = {
  createFilm: async (_, args, context) => {
    const id = context?.user?.id;
    if (!id) return { error: "Пользователь не авторизован" };
    const filmData = args.filmData;
    try {
      let film = await Film.create({ ...filmData, userId: id });
      return { film };
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
      return { film };
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
};
