import { Album } from "../models/albumModel.js";

export const AlbumQueries = {
  getAlbums: async (_, args, context) => {
    const id = context?.user?.id;
    if (!id) return { error: "Пользователь не авторизован" };
    try {
      const albums = await Album.find({ userId: id }).exec();
      return albums;
    } catch (e) {
      return { error: e.message };
    }
  },
  getAlbumById: async (_, args) => await Album.findById(args.id),
};