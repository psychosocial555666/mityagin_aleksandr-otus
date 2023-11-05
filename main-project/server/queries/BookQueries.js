import { Book } from "../models/bookModel.js";

export const BookQueries = {
  getBooks: async (_, args, context) => {
    const id = context?.user?.id;
    if (!id) return { error: "Пользователь не авторизован" };
    try {
      const books = await Book.find({ userId: id }).exec();
      return books;
    } catch (e) {
      return { error: e.message };
    }
  },
  getBookById: async (_, args) => await Book.findById(args.id),
};