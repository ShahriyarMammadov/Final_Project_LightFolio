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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    method: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    origin: [
      "http://localhost:5173/",
      "http://localhost:3000/signup",
      "http://127.0.0.0",
      "http://104.142.122.231",
    ],
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
