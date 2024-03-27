import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    profile_picture: {
      type: String,
      default: "https://drive.google.com/file/d/1yBogLzqarEk_FjdRUovyY6J3NVDhxDqJ/view?usp=drive_link",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    verified: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", userSchema);
