const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/UserModel");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, function (email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, { message: "User not found" });
                if (!user.verifyPassword(password))
                    return done(null, false, { message: "Wrong password" });
                
                return done(null, user);
            });
        })
    );
};
