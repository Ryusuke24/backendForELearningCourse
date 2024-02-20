import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  commentCreateValidation,
} from "./Validations/auth.js";
import { login, register, getMe } from "./Controllers/UserController.js";
import {
  createComment,
  deleteComment,
  getAllComments,
  editComment,
} from "./Controllers/CommentsController.js";
import checkAuth from "./Utils/checkAuth.js";

dotenv.config();
mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log("Mongo connected successfully!"))
  .catch(err => console.log(err));
const app = express();
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post("/auth/login", loginValidation, login);
app.post("/auth/register", registerValidation, register);
app.get("/auth/me", checkAuth, getMe);

app.get("/comments", getAllComments);
app.post("/comments", checkAuth, commentCreateValidation, createComment);
app.delete("/comments/:id", checkAuth, deleteComment);
app.patch("/comments/:id", checkAuth, commentCreateValidation, editComment);

app.post("/uploads", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `uploads/${req.file.originalname}`,
  });
});

app.listen(process.env.PORT, err => {
  if (err) {
    return console.log(err);
  }

  console.log("Server is ready");
});
