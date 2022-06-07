const router = require("express").Router();
const { userController } = require("../../controllers");
const { login, getUsers } = userController;

router.route("/login").post(login);
router.route("/users").get(getUsers);

module.exports = router;