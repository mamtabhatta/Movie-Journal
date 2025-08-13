const express = require("express");
const passport = require("passport");
const { signUp, login } = require("../controllers/AuthController");
const { signupValidation, loginValidation } = require("../middleware/AuthValidate");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/signup", signupValidation, signUp);
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info?.message || "Unauthorized" });
    req.user = user;
    next();
  })(req, res, next);
}, login);

router.get("/user", authMiddleware, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
    },
  });
});

module.exports = router;
