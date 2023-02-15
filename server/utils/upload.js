const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
// app.post("/api/upload", upload.single("photo"), (req, res) => {
//   res.json({ message: "Photo uploaded successfully" });
// });
