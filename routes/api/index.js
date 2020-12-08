const router = require("express").Router();
const userRoutes = require("./user");
const urlsRoutes = require("./urls");

// Book routes
router.use("/user", userRoutes);
router.use("/urls", urlsRoutes);

module.exports = router;