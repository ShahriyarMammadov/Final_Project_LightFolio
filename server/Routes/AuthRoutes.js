const {
  login,
  register,
  updateUserData,
  getUserById,
  emailChanged,
  passwordChanged,
} = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddlewares");

function userRouter(app) {
  app.post("/", checkUser);
  app.post("/register", register);
  app.post("/login", login);
  app.patch("/email/:id", emailChanged);
  app.patch("/password/:id", passwordChanged);
  app.get("/user/:id", getUserById);
  app.put("/user/:id", updateUserData);
}

module.exports = userRouter;
