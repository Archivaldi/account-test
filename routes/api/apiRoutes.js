const router = require("express").Router();
const { apiController } = require("../../controllers");

const { test } = apiController

router.route("/test").get(test);

module.exports = router;