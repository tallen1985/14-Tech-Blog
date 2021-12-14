const router = require('express').Router();
const Comment = require('../../models/Comment');

// get one dish with serialized data
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();

    if (!userData) {
      res.status(400).json({"Message": "No User's Found"})
    }
    res.status(200).send(userData)
  } catch (error) {
    res.status(500).json({"Message": "Internal Server Error Please try again later"})
  }
  
});

module.exports = router;

