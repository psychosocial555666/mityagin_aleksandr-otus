import { Album } from "../models/albumModel.js";

export const AlbumMutations = {
  createAlbum: async (_, args, context) => {
    const id = context?.user?.id;
    if (!id) return { error: "Пользователь не авторизован" };
    const albumData = args.albumData;
    try {
      let album = await Album.create({ ...albumData, userId: id });
      return { album };
    } catch (e) {
      return { error: e.message };
    }
  },
  updateAlbum: async (_, args, context) => {
    const id = context?.user?.id;
    if (!id) return { error: "Пользователь не авторизован" };
    const albumData = args.albumData;
    const album = await Album.findOneAndUpdate({ _id: albumData.id }, albumData, {
      new: true,
    });
    if (album) {
      return { album };
    } else {
      return {
        error: "Книга не найдена",
      };
    }
  },
  deleteAlbum: async (_, args, context) => {
    const id = context?.user?.id;
    if (!id) return { error: "Пользователь не авторизован" };
    const albumId = args.id;
    const album = await Album.deleteOne({ _id: albumId });
    if (album && !!album.deletedCount) {
      return { deleted: !!album.deletedCount };
    } else {
      return {
        deleted: !!album.deletedCount,
        error: "Книга не найдена",
      };
    }
  },
};
