import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Название книги обязательно'],
  },
  userId: { type: String, required: true },
  logo: { type: String },
  rating: { type: String },
  genre: { type: String },
  author: { type: String },
  description: { type: String },
  impressions: { type: String },
}, { timestamps: true });

export const Book = mongoose.model("books", bookSchema);
