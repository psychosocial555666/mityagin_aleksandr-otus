import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  login: {
    type: String,
    required: [true, 'Логин обязателен'],
    validate: {
      validator: function (v) {
        return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(v);
      },
      message: (props) => `${props.value} некорректный адрес`,
    },
  },
  password: {
    type: String,
    required:[true, 'Пароль обязателен'],
    min: [8, "Пароль слишком короткий"],
  },
  userName: {
    type: String,
    required: [true, 'Имя пользователя обязательно'],
    min: [2, "Имя пользователя должно быть минимум из 2 букв"],
  },
  avatar: { type: String },
  about: { type: String },
});

export const User = mongoose.model("users", userSchema);
