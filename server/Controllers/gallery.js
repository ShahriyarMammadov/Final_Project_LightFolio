// const Gallery = require("../models/gallery");

// const getGalleries = async (req, res) => {
//   const userId = req.user.id;
//   const galleries = await Gallery.find({ userId });

//   res.status(200).json(galleries);
// };

// module.exports = { getGalleries };

const File = require("../models/file");

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("Please upload a file");
    }

    const file = new File({
      fileName: req.file.filename,
      filePath: req.file.path,
    });

    await file.save();
    res.send(file);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.sendFile(file.filePath);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
