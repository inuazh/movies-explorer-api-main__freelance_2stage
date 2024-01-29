const isEmail = require("validator/lib/isEmail");
const bcrypt = require("bcryptjs");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, '"email" должно быть заполнено'],
      validate: [isEmail, '"email" неверно заполнено'],
      index: { unique: true },
    },
    password: {
      type: String,
      required: [true, '"password" должно быть заполнено'],
      select: false,
    },
    name: {
      type: String,
      required: [true, '"name" должно быть заполнено'],
      minlength: [2, 'Минимальная длина"name" - 2 символа'],
      maxlength: [30, 'Максимальная длина"name" - 30 символа'],
    },
  },
  {
    versionKey: false,
    toJSON: {
      useProjection: true,
    },
    toObject: {
      useProjection: true,
    },
  }
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError("Неверная почта"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError("Неверный пароль"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
