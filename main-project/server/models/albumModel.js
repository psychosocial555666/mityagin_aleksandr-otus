import mongoose from "mongoose";
const { Schema } = mongoose;

const albumSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Название альбома обязательно'],
  },
  userId: { type: String, required: true },
  logo: { type: String },
  rating: { type: String },
  genre: { type: String },
  author: { type: String },
  year: { type: String },
  songs: { type: [String] },
  impressions: { type: String },
}, { timestamps: true });

export const Album = mongoose.model("albums", albumSchema);
