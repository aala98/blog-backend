const router = require("express").Router();
const {
  createCommentCtrl,
  getAllCommentsCtrl,
  deleteCommentsCtrl,
  updateCommentCtrl,
} = require("../controllers/commentsController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndOnlyUser,
} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

// /api/comments
router
  .route("/")
  .post(verifyToken, createCommentCtrl)
  .get(verifyTokenAndAdmin, getAllCommentsCtrl);

// /api/comments/:id
router
  .route("/:id")
  .delete(validateObjectId, verifyToken, deleteCommentsCtrl)
  .put(validateObjectId, verifyToken, updateCommentCtrl);

module.exports = router;
