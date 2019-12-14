const express = require("express");

const {
  createPost,
  getPosts,
  postsByUser,
  postById,
  deletePost,
  isPoster,
  updatePost
} = require("../controllers/post");
const { createPostValidator } = require("../validator");
const { requireSignIn } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const router = express.Router();

router.get("/posts", requireSignIn, getPosts);
router.post(
  "/post/new/:userId",
  requireSignIn,
  createPost,
  createPostValidator
);
router.get("/posts/by/:userId", requireSignIn, postsByUser);
router.put("/post/:postId", requireSignIn, isPoster, updatePost);
router.delete("/post/:postId", requireSignIn, isPoster, deletePost);
// any route containing userId our app will first execute findById();
router.param("userId", userById);

// any route containing :postId, our app will first execute postById();
router.param("postId", postById);

module.exports = router;
