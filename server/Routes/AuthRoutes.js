const { whatsNewAdded, readingUpdate } = require("../Controllers/adminController");
const { register, login } = require("../controllers/authControllers");
const {
  getUserById,
  getImagesById,
  newGallery,
  coverImageUpload,
  emailChanged,
  passwordChanged,
  galleryDirectionChanged,
  editGalleryName,
  signatureChanged,
  businessDataUpdated,
  profilePhotoUpdated,
  imageDownload,
  updateUserData,
  galleryDeleteByid,
  imageDelete,
  allGalleriesSend,
  getGalleryById,
  getAllUsersData,
  deleteUser,
  ratingUpdated,
  imageCommentAdded,
  commentDelete,
  likeGalleryImage,
} = require("../Controllers/userControllers");
const { checkUser } = require("../middlewares/authMiddlewares");

function userRouter(app) {
  // Authentification Routes
  app.post("/register", register);
  app.post("/login", login);
  app.post("/", checkUser);

  // User Routes
  app.get("/user/:id", getUserById);
  app.get("/images/:userId/:galleryId", getImagesById);
  app.get("/allGalleries", allGalleriesSend);
  app.get("/publicGallery/:id", getGalleryById);
  app.get("/getAllData", getAllUsersData);

  app.post("/galleryCreate/:id", newGallery);
  app.post("/coverImage/:id", coverImageUpload);
  app.post("/comment/:id", imageCommentAdded);
  app.post("/likeImage/:id", likeGalleryImage);

  app.patch("/email/:id", emailChanged);
  app.patch("/password/:id", passwordChanged);
  app.patch("/galleryDirection/:userId/:galleryId", galleryDirectionChanged);
  app.patch("/editGalleryName/:id", editGalleryName);
  app.patch("/signature/:id", signatureChanged);
  app.patch("/business/:id", businessDataUpdated);
  app.patch("/rating/:id", ratingUpdated);

  app.post("/profilePhotoUpdate/:id", profilePhotoUpdated);
  app.post("/uploads/:id", imageDownload);

  // ADMIN PANEL
  app.post("/whatsNew", whatsNewAdded);
  app.patch("/readingUpdate", readingUpdate);

  app.put("/user/:id", updateUserData);

  app.delete("/galleryDelete/:userId/:albomId", galleryDeleteByid);
  app.delete("/imageDelete/:userId/:albomId/:imageId", imageDelete);
  app.delete("/deleteUser/:id", deleteUser);
  app.delete("/commentDelete/:id", commentDelete);
}

module.exports = userRouter;
