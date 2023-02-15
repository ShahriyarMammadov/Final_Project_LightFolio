// const Photo = require("../models/imageSchema");
// const Gallery = require("../models/gallerySchema");

// exports.createPhoto = async (req, res) => {
//   try {
//     const { userId } = req.user;
//     const { filename } = req.file;

//     const photo = new Photo({
//       user: userId,
//       filename,
//       path: `/uploads/${filename}`,
//     });

//     await photo.save();

//     res.status(201).json(photo);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getPhotosByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const photos = await Photo.find({ user: userId }).sort({ createdAt: -1 });

//     res.status(200).json(photos);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Galerileri listele
// exports.gallery_list = (req, res, next) => {
//   Gallery.find()
//     .populate("owner", "name")
//     .populate("images")
//     .exec((err, galleries) => {
//       if (err) {
//         return next(err);
//       }
//       res.json(galleries);
//     });
// };

// // Yeni galeri oluştur
// exports.gallery_create_post = (req, res, next) => {
//   const gallery = new Gallery({
//     title: req.body.title,
//     description: req.body.description,
//     owner: req.user._id,
//   });
//   gallery.save((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.json(gallery);
//   });
// };

// // Galeri detayları
// exports.gallery_detail = (req, res, next) => {
//   Gallery.findById(req.params.id)
//     .populate("owner", "name")
//     .populate("images")
//     .exec((err, gallery) => {
//       if (err) {
//         return next(err);
//       }
//       if (!gallery) {
//         const error = new Error("Gallery not found");
//         error.status = 404;
//         return next(error);
//       }
//       res.json(gallery);
//     });
// };

// // güncelle
// Gallery.findByIdAndUpdate = (req, res) => {
//   req.params.id,
//     {
//       title: req.body.title,
//       description: req.body.description,
//     },
//     { new: true },
//     (err, gallery) => {
//       if (err) {
//         return next(err);
//       }
//       if (!gallery) {
//         const error = new Error("Gallery not found");
//         error.status = 404;
//         return next(error);
//       }
//       res.json(gallery);
//     };
// };

// // Sil
// exports.gallery_delete_delete = (req, res, next) => {
//   Gallery.findByIdAndRemove(req.params.id, (err, gallery) => {
//     if (err) {
//       return next(err);
//     }
//     if (!gallery) {
//       const error = new Error("Gallery not found");
//       error.status = 404;
//       return next(error);
//     }
//     res.json({ message: "Gallery deleted successfully" });
//   });
// };
