const router = require("express").Router();
const {
  getAllUserCtrl,
  getUserProfileCtrl,
  updateUserProfileCtrl,
  getUserCountCtrl,
  profilePhotoUploadCtrl,
  deleteUserProfileCtrl,
} = require("../controllers/usersController.js");
const photoUpload = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
const {
  verifyTokenAndAdmin,
  verifyTokenAndOnlyUser,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");

// /api/users/profile
router.route("/profile").get(verifyTokenAndAdmin, getAllUserCtrl);

// /api/users/profile
router
  .route("/profile/:id")
  .get(validateObjectId, getUserProfileCtrl)
  .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfileCtrl)
  .delete(validateObjectId, verifyTokenAndAuthorization, deleteUserProfileCtrl);

// /api/users/profile/profile-photo-upload
router
  .route("/profile/profile-photo-upload")
  .post(verifyToken, photoUpload.single("image"), profilePhotoUploadCtrl);

// /api/users/count
router.route("/count").get(verifyTokenAndAdmin, getUserCountCtrl);

module.exports = router;
