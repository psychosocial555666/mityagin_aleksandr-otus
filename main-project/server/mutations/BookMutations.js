import { Book } from "../models/bookModel.js";

export const BookMutations = {
  createBook: async (_, args, context) => {
    const id = context?.user?.id;
    if (!id) return { error: "Пользователь не авторизован" };
    const bookData = args.bookData;
    try {
      let book = await Book.create({ ...bookData, userId: id });
      return { book };
    } catch (e) {
      return { error: e.message };
    }
  },
  updateBook: async (_, args, context) => {
    const id = context?.user?.id;
    if (!id) return { error: "Пользователь не авторизован" };
    const bookData = args.bookData;
    const book = await Book.findOneAndUpdate({ _id: bookData.id }, bookData, {
      new: true,
    });
    if (book) {
      return { book };
    } else {
      return {
        error: "Книга не найдена",
      };
    }
  },
  deleteBook: async (_, args, context) => {
    const id = context?.user?.id;
    if (!id) return { error: "Пользователь не авторизован" };
    const bookId = args.id;
    const book = await Book.deleteOne({ _id: bookId });
    if (book && !!book.deletedCount) {
      return { deleted: !!book.deletedCount };
    } else {
      return {
        deleted: !!book.deletedCount,
        error: "Книга не найдена",
      };
    }
  },
};
