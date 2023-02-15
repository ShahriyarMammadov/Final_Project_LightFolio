const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
});

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;
