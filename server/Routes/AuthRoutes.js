import { login, register } from "../controllers/authControllers";
import { checkUser } from "../middlewares/authMiddlewares";

const router = require("express").Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
