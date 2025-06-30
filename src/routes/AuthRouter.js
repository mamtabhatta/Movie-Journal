const express=require("express");
const { signUp, login } = require("../controllers/AuthController");
const { signupValidation, loginValidation } = require("../middleware/AuthValidate");
const router=express.Router();

router.post("/signup",signupValidation,signUp);
router.post("/login",loginValidation,login);

module.exports=router;