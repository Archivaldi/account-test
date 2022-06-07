const router = require("express").Router();
const { userController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const { login, refresh, logout, signup, getUsers } = userController;

router.route("/login").post(login);
router.route("/users").get(auth, getUsers);
router.route("/logout").post(auth, logout);
router.route("/refresh").post(refresh);
router.route("/signup").post(signup);
module.exports = router;