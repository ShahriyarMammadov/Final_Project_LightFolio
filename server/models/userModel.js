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
    position: {
      type: String,
      default: "user",
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
      type: {
        businessWebSite: String,
        businessEmail: String,
        businessPhone: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        postalCode: String,
        country: String,
      },
      default: {},
    },
    default: {},

    socialMedia: {
      type: {
        facebookUrl: String,
        twitterUrl: String,
        pinterestUrl: String,
        linkedinUrl: String,
        youtubeUrl: String,
        tiktokUrl: String,
        snapchatUrl: String,
        instagramUrl: String,
      },
      default: {},
    },

    signature: {
      type: String,
      default: "",
    },

    galleries: [
      {
        galleryName: String,
        coverImage: { coverImg: String },
        galleryImage: [
          {
            image: String,
            comments: [{ comment: String, name: String }],
            likes: [{ type: String }],
          },
        ],
        eventDate: String,
        expirationDate: String,
        galleryDirection: Boolean,
        seoTitle: String,
        seoDescription: String,
        rating: { type: Number, default: 5 },
      },
    ],
    whatsNew: [
      {
        newHeaderText: String,
        newAboutText: String,
        author: String,
        newDate: String,
        reading: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("LightFolioUsers", userSchema);
