const router = require("express").Router();
const { userController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const { login, refresh, getUsers } = userController;

router.route("/login").post(login);
router.route("/users").get(auth, getUsers);
router.route("/refresh").post(refresh);

module.exports = router;