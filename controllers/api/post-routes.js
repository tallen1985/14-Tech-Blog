const router = require("express").Router();
const authorize = require("../../utils/authorize");
const Post = require("../../models/Post");

//Create a new post
router.post("/", authorize, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    if (!postData) {
      res.status(400).json({ Message: "Post creation error" });
    }
    res.status(200).send(postData);
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Internal Server Error Please try again later" });
  }
});

//Route to update post
router.put("/update/", authorize, async (req, res) => {
  try {
    const updateData = await Post.update(
      { title: req.body.title, content: req.body.content },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    if (updateData > 0) {
      res.json({ Message: "Update successful" });
      document.location.replace("/dashboard");
      return;
    } else {
      res.json({ Message: "Update Failed" });
    }
  } catch (error) {
    res.json({ Message: "Internal Server Error Please try again later" });
  }
});

//Route to delete post
router.delete("/delete/:id", authorize, async (req, res) => {
  try {
    const postData = await Post.destroy(
      { title: req.body.title, content: req.body.content },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (postData > 0) {
      res.status(200).send("successfully deleted");
    }
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Internal Server Error Please try again later" });
  }
});
module.exports = router;
