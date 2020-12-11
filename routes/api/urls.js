const router = require("express").Router();
const passport = require("passport");
const urlsController = require("../../controllers/urlsController");
const header = passport.authenticate("jwt", { session: false });

router.route("/")
    .post(urlsController.getAllUrls);

router.route("/generateCode")
    .post(urlsController.generateShorCode);

router.route("/newUrl")
    .post(urlsController.newUrl);

router.route("/:shortUrl")
    .post(urlsController.shortUrl);

router.route("/:shortCode")
    .get(urlsController.getStats);    

module.exports = router;