const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Update User BYID
module.exports.updateUserData = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body);
    res.json({ message: "Settings Saved" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// -----------------------------------------------------

//Get User BYid
module.exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// -----------------------------------------------------

// Create Token
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "secret");
};
// -----------------------------------------------------

// Email and Password error
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "Incorrect Email")
    errors.email = "Email is not registered";

  if (err.message === "Incorrect password")
    errors.password = "Password is incorrect";

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
// -----------------------------------------------------

// Register
module.exports.register = async (req, res, next) => {
  try {
    const { email, password, companyName, fullName } = req.body;
    const user = await userModel.create({
      email,
      password,
      companyName,
      fullName,
    });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};
// -----------------------------------------------------

// Login
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};
// -----------------------------------------------------
