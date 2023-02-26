const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    profilePhoto: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    companyName: {
      type: String,
      required: [true, "companyName is required"],
    },
    fullName: {
      type: String,
      required: [true, "FullName is required"],
    },
    activity: [{ activityName: String, activityDate: String }],

    business: {
      businessWebSite: String,
      businessEmail: String,
      businessPhone: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      postalCode: String,
      country: String,
    },

    socialMedia: {
      facebookUrl: String,
      twitterUrl: String,
      pinterestUrl: String,
      linkedinUrl: String,
      youtubeUrl: String,
      tiktokUrl: String,
      snapchatUrl: String,
      instagramUrl: String,
    },

    signature: {
      type: String,
    },

    galleries: [
      {
        galleryName: String,
        coverImage: { coverImg: String },
        galleryImage: [{ image: String }],
        eventDate: String,
        expirationDate: String,
        galleryDirection: Boolean,
        seoTitle: String,
        seoDescription: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("LightFolioUsers", userSchema);
