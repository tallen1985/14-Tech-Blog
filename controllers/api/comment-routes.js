const router = require("express").Router();
const Comment = require("../../models/Comment");

//Returns all comments
router.get("/", async (req, res) => {
  const commentData = await Comment.findAll();

  if (!commentData) {
    res.status(400).send("error finding comments");
    return;
  }

  res.status(200).send(commentData);
});

//Create a new comment
router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create({
      content: req.body.content,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });

    if (!commentData) {
      res.status(400).json({ Message: "No comments's Found" });
      return;
    }
    res.status(200).send(commentData);

    return;
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Internal Server Error Please try again later" });
    return;
  }
});

module.exports = router;
