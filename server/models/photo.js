const Photo = require("../models/photo");

// Get all photos
exports.getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single photo
exports.getPhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    res.json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a photo
exports.createPhoto = async (req, res) => {
  const photo = new Photo({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.file.path,
    creator: req.user._id,
  });

  try {
    const newPhoto = await photo.save();
    res.status(201).json(newPhoto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a photo
exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);

  if (!photo) {
    return res.status(404).json({ message: "Photo not found" });
  }

  photo.title = req.body.title;
  photo.description = req.body.description;

  try {
    const updatedPhoto = await photo.save();
    res.json(updatedPhoto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a photo
exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);

  if (!photo) {
    return res.status(404).json({ message: "Photo not found" });
  }

  try {
    await photo.remove();
    res.json({ message: "Photo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
