const express = require("express");
const { signup, signin, signout } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { userSignupValidator } = require("../validator");

// const validator = require("../validator");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
// signout
router.get("/signout", signout);

// any route containing userId our app will first execute findById();
router.param("userId", userById);
module.exports = router;
