const router = require("express").Router();
const userRoutes = require("./users");
const urlsRoutes = require("./urls");

// Book routes
router.use("/users", userRoutes);
router.use("/urls", urlsRoutes);

module.exports = router;