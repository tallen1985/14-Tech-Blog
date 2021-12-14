const sequelize = require('../config/connection');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.create({
    "user_name": "Jake",
    "password": "password",
    
  });

  await Post.create({
    "title": "generic post",
    "content": "lapso ipsom blah blah blah",
    "user_id": 1,
  })

  await Comment.create({
    "content": 'great post',
    "user_id": 1,
    "post_id": 1, 
  })

  process.exit(0);
};

seedDatabase();
