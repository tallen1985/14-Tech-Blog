const router = require('express').Router();
const {User, Post, Comment} = require('../../models/');

// get one dish with serialized data
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{model: Post}, {model: Comment}]
    });

    if (!userData) {
      res.status(400).json({"Message": "No User's Found"})
    }
    res.status(200).send(userData)
  } catch (error) {
    res.status(500).json({"Message": "Internal Server Error Please try again later"})
  }
  
});

module.exports = router;

