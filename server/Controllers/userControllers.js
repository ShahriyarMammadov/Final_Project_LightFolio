const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//-------------------- Update User Data -----------------------------
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
//-------------------------------------------------------------------

//---------------------- Get User By ID -----------------------------
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
//-------------------------------------------------------------------

//------------------------ Email Change -----------------------------
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
//-------------------------------------------------------------------

//--------------------- Password Change -----------------------------
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
//-------------------------------------------------------------------

//-------------------- Signature Change -----------------------------
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
//-------------------------------------------------------------------

//-------------------- Business Data Updated ------------------------
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
//-------------------------------------------------------------------

//-------------------- Profile Photo Updated ------------------------
module.exports.profilePhotoUpdated = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, {
      profilePhoto: req.body.newImage.myFile,
    });

    res.status(201).json({ message: "Updated Successfully" });
  } catch (error) {
    console.log(error);
  }
};
//-------------------------------------------------------------------

//---------------------- Edit Gallery Name --------------------------
module.exports.editGalleryName = async (req, res) => {
  try {
    const { id } = req.params;
    const { albomId, value } = req.body;
    const user = await userModel.findById(id);
    const gallery = await user.galleries.find(
      (gallery) => gallery._id.toString() === albomId
    );
    gallery.galleryName = value.name;
    await user.save();
    res
      .status(201)
      .json({ message: "Gallery Successfully Renamed", status: true });
  } catch (error) {
    console.log(error);
  }
};
//-------------------------------------------------------------------

//------------------- Gallery Delete By ID --------------------------
module.exports.galleryDeleteByid = async (req, res) => {
  try {
    const galleryId = req.params.albomId;
    const userId = req.params.userId;
    let user = await userModel.findById(userId);

    console.log(galleryId);

    const galeri = await user.galleries.filter(
      (gallery) => gallery._id.toString() !== galleryId
    );

    user.galleries = galeri;

    await user.save();

    res
      .status(200)
      .json({ message: "Gallery Successfully Deleted", delete: true });
  } catch (error) {
    res.json({ error: error, delete: false });
  }
};
//-------------------------------------------------------------------

//-------------------- Image Delete By ID ---------------------------
module.exports.imageDelete = async (req, res) => {
  const userId = req.params.userId;
  const albomId = req.params.albomId;
  const imageId = req.params.imageId;

  try {
    const user = await userModel.findById(userId);

    const gallery = user.galleries.find(
      (g) => g._id.toString() === albomId.toString()
    );
    if (!gallery) {
      return res.status(404).json({ error: "Gallery not found" });
    }

    const image = gallery.galleryImage.find(
      (img) => img._id.toString() === imageId.toString()
    );
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    gallery.galleryImage.pull({ _id: imageId });
    await user.save();

    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
//-------------------------------------------------------------------

//---------------------- Image Download -----------------------------
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
      res
        .status(201)
        .json({ message: "Image Upload Successfully", upload: true });
    }
  } catch (error) {
    console.log(error);
    res.status(409).json({
      message: error.message,
      upload: false,
    });
  }
};
//-------------------------------------------------------------------

//------------------- Cover Image Upload ----------------------------
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

    res.status(201).json({ message: "Updated Successfully" });
  } catch (error) {
    console.log(error);
  }
};
//-------------------------------------------------------------------

//----------------------- New Gallery -------------------------------
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
//-------------------------------------------------------------------

//----------------- Gallery Direction Change ------------------------
module.exports.galleryDirectionChanged = async (req, res) => {
  const userId = req.params.userId;
  const galleryId = req.params.galleryId;

  try {
    const user = await userModel.findById(userId);
    const gallery = user.galleries.find((g) => g._id.toString() === galleryId);

    if (!gallery) {
      return res.status(404).json({ message: "Gallery Not Found!!" });
    }
    gallery.galleryDirection = req.body.direction;

    user.save();
    return res.status(200).json({ message: "Updated Succesfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};
//-------------------------------------------------------------------

//----------------- Get Images By Gallery ID ------------------------
module.exports.getImagesById = async (req, res) => {
  const userId = req.params.userId;
  const galleryId = req.params.galleryId;
  console.log(userId);
  try {
    const user = await userModel.findById(userId);
    const gallery = await user.galleries.find(
      (g) => g._id.toString() === galleryId
    );

    if (!gallery) {
      return res.status(404).json({ message: "Gallery Not Found!!" });
    }

    return res.status(200).json(gallery);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};
//-------------------------------------------------------------------

//---------------------- Get All Gallery ----------------------------
module.exports.allGalleriesSend = async (req, res) => {
  try {
    userModel.find({}, { galleries: 1 })
      .then((users) => {
        const galleries = users.flatMap((user) =>
          user.galleries.filter((gallery) => gallery.galleryDirection)
        );
        res.json(galleries);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (error) {
    console.log(error)
    res.json({ error: error });
  }
};
//-------------------------------------------------------------------
