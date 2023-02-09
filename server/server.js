const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require("cookie-parser");

const app = express();
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

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
