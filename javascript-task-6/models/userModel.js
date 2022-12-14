import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  userName: { type: String, required: true }
});

export const User = mongoose.model('users', userSchema);

