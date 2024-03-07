const jwt = require('jsonwebtoken');
const { NotAuthorized } = require('../errors/not-authorized');

const secretKey = 'SECRET_KEY';
const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthorized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : secretKey);
  } catch (err) {
    return next(new NotAuthorized('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
