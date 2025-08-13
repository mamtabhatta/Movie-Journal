const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/UserModel");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const isMatch = await user.verifyPassword(password);
        if (!isMatch) {
          return done(null, false, { message: "Wrong password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
};
