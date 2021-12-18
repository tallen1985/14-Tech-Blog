const router = require("express").Router();
const { User, Post, Comment } = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Post }, { model: Comment }],
    });

    if (!userData) {
      res.status(400).json({ Message: "No User's Found" });
    }
    res.status(200).send(userData);
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Internal Server Error Please try again later" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.create(req.body);

    if (!userData) {
      res.status(400).json({ Message: "Error adding user" });
    }
    res.status(200).send({ message: "Successfully added User" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Message: "Internal Server Error Please try again later" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        user_name: req.body.user_name,
      },
    });

    const validated = await userData.validatePassword(req.body.password);

    if (!userData || !validated) {
      res.status(400).json({ Message: "Login Failed" });
    }

    res.status(200).send("Successfully logged in!");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Message: "Internal Server Error Please try again later" });
  }
});

module.exports = router;
