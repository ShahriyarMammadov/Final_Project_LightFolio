const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

// Morgan, console -de response statuslari ve s. gormek ucun
app.use(morgan("dev"));
// -------------------------------------------------------

// Cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// -------------------------------------------------------

app.use(express.json());

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Authentification Routes
const authRoutes = require("./Routes/AuthRoutes");
const userModel = require("./models/userModel");
const multer = require("multer");
authRoutes(app);
// -------------------------------------------------------

app.post("/uploads", async (req, res) => {
  const body = req.body;
  try {
    const newimg = await userModel.images.create(body);
    newimg.save();
    res.status(201).json({ message: "yes new message" });
  } catch (error) {
    console.log(error);
  }
});

// Express js Server
const port = 3000;
app.listen(port, () => {
  console.log("server islediiiiii .. . . .");
});
// -------------------------------------------------------

// TEST
// const router = require("./Routes/PhotoRoutes");

// app.use("/galleries", router);
// app.use("/images", router);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("photo"), (req, res) => {
  res.json({ message: "Photo uploaded successfully" });
});

// -------------------------------------------------------

// DataBase mongoDB
mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://ShahriyarMammadov:sehriyar123@cluster0.xjblasa.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log(err);
  });
// -------------------------------------------------------
