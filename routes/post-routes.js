const express = require('express');
const {
  getPosts,
  getPost,
  deletePost,
  addPost,
  updatePost } = require('../controllers/post-controller');

const router = new express.Router();

router.get('/posts', getPosts)
router.get('/posts/:id', getPost)
router.delete('/posts/:id', deletePost)
router.post('/posts', addPost)
router.patch('/posts/:id', updatePost)

module.exports = router;
