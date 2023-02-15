const {
  login,
  register,
  updateUserData,
  getUserById,
} = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddlewares");

function userRouter(app) {
  app.post("/", checkUser);
  app.post("/register", register);
  app.post("/login", login);
  app.get("/user/:id", getUserById);
  app.put("/user/:id", updateUserData);
}

module.exports = userRouter;
