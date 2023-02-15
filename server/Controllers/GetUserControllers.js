// const User = require("../models/userModel");

// //GET USERS DATA
// module.exports.getUser = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //GET USER BY ID
// module.exports.getUserById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findById(id);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// //POST NEW GALLERY
// module.exports.createGallery = async (req, res) => {
//   const newGallery = new User(req.body);
//   try {
//     await newGallery.save();
//     res.status(201).json(newGallery);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //DELETE GALLERY BY ID
// module.exports.deleteGallery = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedGallery = await User.findByIdAndDelete(id);
//     res.json(deletedGallery);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //UPDATE USER
// module.exports.updateUser = async (req, res) => {
//   console.log(req);
//   const { id } = req.params;
//   try {
//     const updatedUser = await User.findByIdAndUpdate(id, req.body);
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
