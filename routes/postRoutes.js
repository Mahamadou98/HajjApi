const express = require('express');

const {
  getAllPost,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require('./../controllers/postController');

const router = express.Router();

router.route('/').get(getAllPost).post(createPost);

router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;
