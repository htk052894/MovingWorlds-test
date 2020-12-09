const router = require("express").Router();
const passport = require("passport");
const userController = require("../../controllers/userController");
const header = passport.authenticate("jwt", { session: false });

router.route("/register")
    .post(userController.register);

router.route("/login")
    .post(userController.login);

router.route("/current")
    .post(header, userController.current)

module.exports = router;