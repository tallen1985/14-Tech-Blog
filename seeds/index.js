const sequelize = require('../config/connection');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate([{
    "user_name": "Jake",
    "password": "password",
    },
    {
     "user_name": "Ian",
     "password": "dinosaur"
    }]);

  await Post.bulkCreate([{
    "title": "generic post",
    "content": "lapso ipsom blah blah blah",
    "user_id": 1,
  },
  {
    "title": "Ian's Post",
    "content": "Dinosaurs are cool",
    "user_id": 2,
  }])

  await Comment.bulkCreate([{
    "content": 'great post',
    "user_id": 1,
    "post_id": 1, 
  },
  {
    "content": 'invigorating',
    "user_id": 1,
    "post_id": 2, 
  }])

  process.exit(0);
};

seedDatabase();
