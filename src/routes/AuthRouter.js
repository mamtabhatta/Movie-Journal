const express = require("express");
const passport= require("passport");
const { signUp, login } = require("../controllers/AuthController");
const { signupValidation, loginValidation } = require("../middleware/AuthValidate");

const router = express.Router();

router.post("/signup",signupValidation, signUp);
router.post("/login",loginValidation, passport.authenticate("local"),login);

module.exports = router;