const router = require('express').Router();
const Comment = require('../../models/Comment');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();

    if (!commentData) {
      res.status(400).json({"Message": "No User's Found"})
    }
    res.status(200).send(commentData)
  } catch (error) {
    res.status(500).json({"Message": "Internal Server Error Please try again later"})
  }
  
});

module.exports = router;

