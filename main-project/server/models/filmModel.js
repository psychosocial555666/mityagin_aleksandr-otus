import mongoose from "mongoose";
const { Schema } = mongoose;

const filmSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Название фильма обязательно'],
  },
  userId: { type: String, required: true },
  type: { type: String },
  logo: { type: String },
  rating: { type: String },
  country: { type: String },
  genre: { type: String },
  director: { type: [String] },
  artists: { type: [String] },
  description: { type: String },
  impressions: { type: String },
}, { timestamps: true });

export const Film = mongoose.model("films", filmSchema);
