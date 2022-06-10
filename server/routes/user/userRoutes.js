const router = require("express").Router();
const { userController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const { login, refresh, logout, signup, googleLogin, getUsers, uploadPicture } = userController;

router.route("/login").post(login);
router.route("/users").get(auth, getUsers);
router.route("/logout").post(auth, logout);
router.route("/refresh").post(refresh);
router.route("/signup").post(signup);
router.route("/google-login").post(googleLogin);
router.route("/upload-picture").post(uploadPicture);

module.exports = router;