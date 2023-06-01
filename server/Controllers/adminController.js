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
