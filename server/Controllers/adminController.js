const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const LightFolioUsers = require("../models/userModel");

module.exports.whatsNewAdded = async (req, res) => {
  try {
    try {
      const newWhatsNew = {
        newHeaderText: req.body.newHeaderText,
        newAboutText: req.body.newAboutText,
        author: req.body.author,
      };

      await LightFolioUsers.updateMany(
        {},
        { $push: { whatsNew: newWhatsNew } }
      );
      console.log("Success");
      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.readingUpdate = async (req, res) => {
  const userId = req.body.id;
  console.log(userId)

  try {
    const result = await LightFolioUsers.updateOne(
      { _id: userId },
      { $set: { "whatsNew.$[].reading": true } }
    );
    res.status(200).json({ success: true, message: "Updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "error" });
  }
};
