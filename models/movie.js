const mongoose = require("mongoose");
const isURL = require("validator/lib/isURL");

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [
        true,
        'Поле "country" не заполнено',
      ],
    },
    director: {
      type: String,
      required: [
        true,
        'Поле "director" не заполнено',
      ],
    },
    duration: {
      type: Number,
      required: [
        true,
        'Поле "duration" не заполнено',
      ],
    },
    year: {
      type: String,
      required: [
        true,
        'Поле "year" не заполнено',
      ],
    },
    description: {
      type: String,
      required: [
        true,
        'Поле "description" не заполнено',
      ],
    },
    image: {
      type: String,
      required: [
        true,
        'Поле "image" не заполнено',
      ],
      validate: [
        isURL,
        'Поле "image" неверно заполнено',
      ],
    },
    trailerLink: {
      type: String,
      required: [
        true,
        'Поле "trailerLink"  не заполнено',
      ],
      validate: [
        isURL,
        'Поле "trailerLink"  неверно заполнено',
      ],
    },
    thumbnail: {
      type: String,
      required: [
        true,
        'Поле "thumbnail" не заполнено',
      ],
      validate: [isURL, 'Поле "thumbnail" неверно заполнено'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    movieId: {
      type: Number,
      required: [true, 'Поле "movieId" не заполнено'],
    },
    nameRU: {
      type: String,
      required: [
        true,
        'Поле "nameRU" не заполнено',
      ],
    },
    nameEN: {
      type: String,
      required: [
        true,
        'Поле "nameEN" не заполнено',
      ],
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("movie", movieSchema);
