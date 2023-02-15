const Gallery = require("../models/gallery");

const getGalleries = async (req, res) => {
  const userId = req.user.id;
  const galleries = await Gallery.find({ userId });

  res.status(200).json(galleries);
};

module.exports = { getGalleries };
