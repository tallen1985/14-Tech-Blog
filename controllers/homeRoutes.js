const router = require("express").Router();
const { User, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
  const postData = await Post.findAll({
    order: [["createdAt", "desc"]],
    include: [
      { model: User, attributes: ["user_name"] },
      {
        model: Comment,
        include: [
          {
            model: User,
            attributes: ["user_name"],
          },
        ],
      },
    ],
  });

  if (!postData) {
    res.status(400).send("Cannot Find Posts");
  }
  const data = postData.map((post) => {
    return post.get({ plain: true });
  });
  res.render("home", {
    data,
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
