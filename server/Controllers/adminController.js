const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const LightFolioUsers = require("../models/userModel");

module.exports.whatsNewAdded = async (req, res) => {
  try {
    const newWhatsNew = {
      newHeaderText: req.body.newHeaderText,
      newAboutText: req.body.newAboutText,
      author: req.body.author,
      newDate: req.body.newDate,
    };

    const users = await LightFolioUsers.find();

    for (const user of users) {
      user.whatsNew.unshift(newWhatsNew);
      await user.save();
    }

    console.log("Success");
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
};

module.exports.readingUpdate = async (req, res) => {
  const userId = req.body.id;
  console.log(userId);

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
