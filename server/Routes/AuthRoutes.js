const {
  login,
  register,
  updateUserData,
  getUserById,
  emailChanged,
  passwordChanged,
  signatureChanged,
  imageDownload,
} = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddlewares");

function userRouter(app) {
  app.get("/user/:id", getUserById);
  app.post("/", checkUser);
  app.post("/register", register);
  app.post("/login", login);
  app.patch("/email/:id", emailChanged);
  app.patch("/password/:id", passwordChanged);
  app.patch("/uploads/:id", imageDownload);
  app.patch("/signature/:id", signatureChanged);
  app.put("/user/:id", updateUserData);
}

module.exports = userRouter;
