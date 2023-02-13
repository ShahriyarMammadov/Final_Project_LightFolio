const { login, register, getUser } = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddlewares");

function userRouter(app) {
  app.post("/", checkUser);
  app.post("/register", register);
  app.post("/login", login);
  app.get("/user/:id", getUser);
}

module.exports = userRouter;
