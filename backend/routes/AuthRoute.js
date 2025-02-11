const { Signup, Login } = require("../controllers/AuthController");
const { userVerification } = require("../middlewares/AuthMiddleware");
const { addUrl } = require("../controllers/UrlController");
const router = require("express").Router();
const { getUrls } = require("../controllers/UrlController");

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification);
router.post("/add-url", userVerification, addUrl);
router.get("/urls", userVerification, getUrls);
// router.get('/urls', userVerification, getUserUrls);

module.exports = router;
