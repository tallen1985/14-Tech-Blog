const router = require("express").Router();
const { User, Post, Comment } = require("../../models/index");

//Signup route - sets up cookie, creates user and logs in
router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.create(req.body);

    if (!userData) {
      res.status(400).json({ Message: "Error adding user" });
    }

    req.session.save(() => {
      req.session.user_name = userData.dataValues.user_name;
      req.session.logged_in = true;
      req.session.user_id = userData.dataValues.id;

      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Message: "Internal Server Error Please try again later" });
  }
});

//Route for logging in, setting up cookie
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        user_name: req.body.user_name,
      },
    });

    if (!userData) {
      res.status(400).json({ Message: "Login Failed" });
      res.end();
      return;
    }

    const validated = await userData.validatePassword(req.body.password);

    if (validated) {
      req.session.save(() => {
        req.session.user_name = userData.dataValues.user_name;
        req.session.logged_in = true;
        req.session.user_id = userData.dataValues.id;
        res.status(200).json({ message: "You are now logged in!" });
        res.end();
        return;
      });
    } else {
      res.status(400).json({ Message: "Invalid Username or Password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ Message: "Internal Server Error Please try again later" });
    res.end();
  }
});

//Route for logging out
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
