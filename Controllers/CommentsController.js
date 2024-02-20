import CommentModel from "../Models/Comment.js";
import UserModel from "../Models/User.js";

export const createComment = async (req, res) => {
  try {
    const user = {};
    await UserModel.findById({ _id: req.userId }).then(doc => {
      user.userName = doc.userName;
      user.avatarUrl = doc.avatarUrl;
    });

    const doc = new CommentModel({
      courseName: req.body.courseName,
      lessonNumber: req.body.lessonNumber,
      text: req.body.text,
      userId: req.userId,
      user: user.userName,
      userImageUrl: user.avatarUrl,
    });

    const comment = await doc.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось создать комментарий",
    });
  }
};

export const editComment = async (req, res) => {
  try {
    const user = {};
    await UserModel.findById({ _id: req.userId }).then(doc => {
      user.userName = doc.userName;
      user.avatarUrl = doc.avatarUrl;
    });

    const commentId = req.params.id;

    await CommentModel.updateOne(
      {
        _id: commentId,
      },
      {
        courseName: req.body.courseName,
        lessonNumber: req.body.lessonNumber,
        text: req.body.text,
        userId: req.userId,
        user: user.userName,
        userImageUrl: user.avatarUrl,
      }
    );

    const comment = await CommentModel.findById(commentId);
    res.json(comment);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось изменить комментарий",
    });
  }
};

export const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  CommentModel.findOneAndDelete({
    _id: commentId,
  })
    .then(doc => {
      if (!doc) {
        console.log(err);
        res.status(500).json({
          message: "Не удалось удалить комментарий",
        });
      }
      res.json(doc);
    })
    .catch(err => {
      return res.status(500).json({
        message: "Не удалось удалить комментарий",
      });
    });
};
export const getAllComments = async (req, res) => {
  try {
    const comments = await CommentModel.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить комментарии",
    });
  }
};
