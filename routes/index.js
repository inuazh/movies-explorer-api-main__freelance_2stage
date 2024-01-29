const router = require("express").Router();

const { celebrate } = require("celebrate");
const { errors } = require("celebrate");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { rateLimiter } = require("../middlewares/rateLimiter");
const centralizedErrorHandler = require("../middlewares/centralizedErrorHandler");
const NotFoundError = require("../utils/errors/NotFoundError");
const { requestLogger, errorLogger } = require("../middlewares/logger");


const {
  JoiBodyEmailPassword,
  JoiBodyEmailPasswordName,
} = require("../utils/validationConstants");

router.use(requestLogger);

router.use(rateLimiter);

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

router.post("/signin", celebrate(JoiBodyEmailPassword), login);
router.post("/signup", celebrate(JoiBodyEmailPasswordName), createUser);

router.use(auth);

router.use("/users", require("./users"));
router.use("/movies", require("./movies"));

router.use("*", (req, res, next) =>
  next(new NotFoundError("Запрашиваемый адрес не найден"))
);

router.use(errorLogger);

router.use(errors());

router.use(centralizedErrorHandler);

module.exports = router;
