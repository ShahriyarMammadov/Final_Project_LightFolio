const {
  login,
  register,
  updateUserData,
  getUserById,
  emailChanged,
  passwordChanged,
  signatureChanged,
  imageDownload,
  businessDataUpdated,
  newGallery,
  coverImageUpload,
  getImagesById,
} = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddlewares");

function userRouter(app) {
  app.get("/user/:id", getUserById);
  app.get("/images/:userId/:galleryId", getImagesById);
  app.post("/", checkUser);
  app.post("/register", register);
  app.post("/login", login);
  app.post("/galleryCreate/:id", newGallery);
  app.post("/coverImage/:id", coverImageUpload);
  app.patch("/email/:id", emailChanged);
  app.patch("/password/:id", passwordChanged);
  app.post("/uploads/:id", imageDownload);
  app.patch("/signature/:id", signatureChanged);
  app.patch("/business/:id", businessDataUpdated);
  app.put("/user/:id", updateUserData);
}

module.exports = userRouter;
