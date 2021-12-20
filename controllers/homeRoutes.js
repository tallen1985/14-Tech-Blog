const router = require("express").Router();
const authorize = require("../utils/authorize");
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
  const data = postData.map((post) => post.get({ plain: true }));

  res.render("home", {
    data,
    logged_in: req.session.logged_in,
    user_name: req.session.user_name,
  });
});

router.get("/dashboard", authorize, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        user_name: req.session.user_name,
      },
      include: [{ model: Post }],
    });

    if (!userData) {
      res.status(400).json({ message: "Server Error" });
      return;
    }

    const data = [userData].map((e) => e.get({ plain: true }));
    res.render("dashboard", {
      data,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.send(err);
    return;
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/newPost", authorize, (req, res) => {
  res.render("newPost", {
    logged_in: req.session.logged_in,
    user_name: req.session.user_name,
  });
});

module.exports = router;
