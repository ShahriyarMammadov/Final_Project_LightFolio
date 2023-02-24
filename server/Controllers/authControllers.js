const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Update User BYID
module.exports.updateUserData = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, {
      fullName: req.body.fullName,
      email: req.body.email,
    });
    const updateActivity = await userModel.findByIdAndUpdate(id, {
      $push: {
        activity: {
          activityName: req.body.activity,
          activityDate: req.body.activityDate,
        },
      },
    });
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

// Email Changed
module.exports.emailChanged = async (req, res) => {
  try {
    const { id } = req.params;
    const { newEmail, password, activity, activityDate } = req.body;
    const user = await userModel.findById(id);

    if (!user) {
      throw Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw Error("Incorrect password");
    }

    const existingUser = await userModel.findOne({ email: newEmail });
    if (existingUser && existingUser._id.toString() !== id) {
      throw Error("Email address already in use");
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, {
      email: newEmail,
    });
    const updateActivity = await userModel.findByIdAndUpdate(id, {
      $push: {
        activity: { activityName: activity, activityDate: activityDate },
      },
    });
    res.status(200).json({ message: "Email address changed successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
// -----------------------------------------------------

// Password Changed
module.exports.passwordChanged = async (req, res) => {
  try {
    const { id } = req.params;
    let { currentPassword, newPassword, activity, activityDate } = req.body;
    const user = await userModel.findById(id);
    if (!user) {
      throw Error("User not found!!!");
    }

    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordMatch) {
      throw Error("Password is incorrect");
    }

    let updateActivity = await userModel.findByIdAndUpdate(id, {
      $push: {
        activity: { activityName: activity, activityDate: activityDate },
      },
    });

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    const passwordUpdate = await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
// -----------------------------------------------------

// Signature Changed
module.exports.signatureChanged = async (req, res) => {
  const { id } = req.params;
  const { activity, activityDate } = req.body;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, {
      signature: req.body.signature,
    });

    let updateActivity = await userModel.findByIdAndUpdate(id, {
      $push: {
        activity: { activityName: activity, activityDate: activityDate },
      },
    });
    res.json({ message: "Settings Saved" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// -----------------------------------------------------

// Business Data Updated
module.exports.businessDataUpdated = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const updateBusinessData = await userModel.findByIdAndUpdate(id, {
      business: req.body,
    });
    const updateCompanyName = await userModel.findByIdAndUpdate(id, {
      companyName: body.companyName,
    });
    const updateSocialMedia = await userModel.findByIdAndUpdate(id, {
      socialMedia: body,
    });

    res.json({ message: "Success" });
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

  if (err.message === "User not found")
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

// Image Download`
module.exports.imageDownload = async (req, res, next) => {
  try {
    if (req.headers["content-length"] > 20 * 1024 * 1024) {
      res.status(400).json({ error: "Image Length Very Long!!!!" });
    } else {
      const { id } = req.params;
      const albomId = req.body.albomId;
      const newImage = req.body.newImage.myFile;

      const user = await userModel.findById(id);

      const gallery = await user.galleries.find(
        (gallery) => gallery._id.toString() === albomId
      );

      gallery.galleryImage.push({
        _id: new mongoose.Types.ObjectId(),
        image: newImage,
      });

      await user.save();
      res.status(201).json({ message: "Image Upload Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(409).json({
      message: error.message,
    });
  }
};
// -----------------------------------------------------

module.exports.coverImageUpload = async (req, res) => {
  try {
    const { id } = req.params;
    const { albomId } = req.body;

    const user = await userModel.findById(id);

    const gallery = user.galleries.find(
      (gallery) => gallery._id.toString() === albomId
    );

    gallery.coverImage = { coverImg: req.body.newImage.myFile };
    await user.save();
  } catch (error) {
    console.log(error);
  }
};

//---------------- New Gallery --------------------------
module.exports.newGallery = async (req, res) => {
  const { id } = req.params;
  const gallery = await userModel.findByIdAndUpdate(
    id,
    {
      $push: {
        galleries: req.body,
      },
    },
    { new: true }
  );
  res.json({ galleryId: gallery.galleries[gallery.galleries.length - 1]._id });
};
//-------------------------------------------------------

//--------- Get Images By Gallery ID -------------
module.exports.getImagesById = async (req, res) => {
  const userId = req.params.userId;
  const galleryId = req.params.galleryId;

  try {
    const user = await userModel.findById(userId);
    const gallery = user.galleries.find((g) => g._id.toString() === galleryId);

    if (!gallery) {
      return res.status(404).send("Gallery Not Found!!");
    }

    return res.status(200).json(gallery);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};
//--------------------------------------------

// Register
module.exports.register = async (req, res) => {
  const { email, password, companyName, fullName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new userModel({
      companyName: companyName,
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    const result = await newUser.save();
    const { password, ...data } = result.toJSON();

    const token = createToken(newUser._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: newUser._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};
// -----------------------------------------------------

// Login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      throw Error("User not found");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw Error("Incorrect password");
    }
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ data: user, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};
