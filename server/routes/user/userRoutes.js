const router = require("express").Router();
const { userController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const { login, getUsers } = userController;

router.route("/login").post(login);
router.route("/users").get(auth, getUsers);

module.exports = router;