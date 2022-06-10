const router = require("express").Router();
const apiRoutes = require("./api/apiRoutes");
const userRoutes = require("./user/userRoutes");

router.use("/api", apiRoutes);
router.use("/user", userRoutes);

module.exports = router;