import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    lessonNumber: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    user: {
      type: String,
    },
    userImageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", CommentSchema);
