const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
// app.use(bodyParser.json());

app.use(
  cors({
    method: ["GET", "POST"],
    origin: "http://localhost:5173/",
    credentials: true,
  })
);

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
