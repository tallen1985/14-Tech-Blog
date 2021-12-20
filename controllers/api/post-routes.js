const router = require("express").Router();
const authorize = require("../../utils/authorize");
const Post = require("../../models/Post");

router.post("/", authorize, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    if (!postData) {
      res.status(400).json({ Message: "No User's Found" });
    }
    res.status(200).send(postData);
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Internal Server Error Please try again later" });
  }
});

router.get("/:id", authorize, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(400).json({ Message: "No Post Found" });
      return;
    }
    let data = [postData].map((e) => e.get({ plain: true }));
    res.render("post", {
      data,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Internal Server Error Please try again later" });
  }
});

module.exports = router;
