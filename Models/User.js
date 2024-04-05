import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: `http://localhost:4000/uploads/noAvatar.png`,
    },
    isAdmin: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
