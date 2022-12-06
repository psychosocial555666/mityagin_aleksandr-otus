import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  login: String,
  password: String,
  userName: String
});

export const User = mongoose.model('users', userSchema); 

