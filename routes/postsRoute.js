const router = require("express").Router();
const {
  createPostCtrl,
  getAllPostsCtrl,
  getSinglePostsCtrl,
  getPostCountCtrl,
  deletePostsCtrl,
  updatePostsCtrl,
  updatePostImageCtrl,
  toggleLikeCtrl,
} = require("../controllers/postsController");
const photoUpload = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/verifyToken");

// /api/posts
router
  .route("/")
  .post(verifyToken, photoUpload.single("image"), createPostCtrl)
  .get(getAllPostsCtrl);

// /api/posts/count
router.route("/count").get(getPostCountCtrl);

// /api/posts/:id
router
  .route("/:id")
  .get(validateObjectId, getSinglePostsCtrl)
  .delete(validateObjectId, verifyToken, deletePostsCtrl)
  .put(validateObjectId, verifyToken, updatePostsCtrl);

// /api/posts/update-image/:id
router
  .route("/update-image/:id")
  .put(
    validateObjectId,
    verifyToken,
    photoUpload.single("image"),
    updatePostImageCtrl
  );

// /api/posts/like/:id
router.route("/like/:id").put(validateObjectId, verifyToken, toggleLikeCtrl);

module.exports = router;
