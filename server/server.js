const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRoutes = require("./Routes/GetUserRoutes");

// const authRoutes = require("./Routes/AuthRoutes");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(cookieParser());
app.use(express.json());

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

const authRoutes = require("./Routes/AuthRoutes");
const userModel = require("./models/userModel");

authRoutes(app);

// app.use("/userData", UserRoutes);

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

mongoose.set("strictQuery", true);
const port = 3000;
app.listen(port, () => {
  console.log("server islediiiiii .. . . .");
});

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
