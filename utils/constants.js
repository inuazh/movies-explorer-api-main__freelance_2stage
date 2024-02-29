module.exports = Object.freeze({
  urlRegular: /(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&amp;%#!\-/]))?/,
  allowedCors: [
    'http://localhost:3000',
    'http://localhost:3001',
    'api.filippovdo.diplom.nomoredomainsmonster.ru',
    'https://api.filippovdo.diplom.nomoredomainsmonster.ru',
    'http://api.filippovdo.diplom.nomoredomainsmonster.ru',
  ],
});
