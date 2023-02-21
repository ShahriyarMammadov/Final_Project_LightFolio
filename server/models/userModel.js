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
      businessName: String,
      businessWebsite: String,
      businessEmail: String,
      businessPhone: String,
      businessAddress: {
        addressLine1: String,
        addressLine2: String,
        city: String,
        postalCode: String,
        country: String,
      },
    },

    socialMedia: {
      facebook: String,
      twitter: String,
      pinterest: String,
      linkedin: String,
      youtube: String,
      tiktok: String,
      snapchat: String,
      instagram: String,
    },

    signature: {
      type: String,
    },

    galleries: [{ galleryName: String, galleryImage: [String] }],
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   // const salt = await bcrypt.genSalt();
//   // this.password = await bcrypt.hash(this.password, salt);
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.statics.login = async function (email, password) {
//   const user = await this.findOne({ email });

//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error("Incorrect password");
//   }
//   throw Error("Incorrect Email");
// };

module.exports = mongoose.model("LightFolioUsers", userSchema);
