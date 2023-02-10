const { login, register } = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddlewares");

const router = require("express").Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
