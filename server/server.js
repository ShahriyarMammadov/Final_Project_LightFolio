const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

//------------------------- Morgan ------------------------
app.use(morgan("dev"));
// --------------------------------------------------------

//------------------------- Cookie ------------------------
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// --------------------------------------------------------

//-------------------- Express js server Config -----------
app.use(express.json({ limit: "20mb" }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
// --------------------------------------------------------

//------------------------- User Routes -------------------
const authRoutes = require("./Routes/AuthRoutes");
authRoutes(app);
// ---------------------------------------------------------

//--------------------- Express js Server ------------------
const port = 3000;
app.listen(port, () => {
  console.log("Server Worked");
});
// ---------------------------------------------------------

//-------------------- DataBase mongoDB --------------------
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
    console.log("DataBase Connected");
  })
  .catch((err) => {
    console.log(err);
  });
// -------------------------------------------------------
