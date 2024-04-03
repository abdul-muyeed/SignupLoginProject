import { Strategy } from "passport-local";
import User from "../models/user.js";
import passport from "passport";
import { comparePassword } from "../configs/hashPassword.js";

export default passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      // passReqToCallback: true,
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username });
        if (!user) {
          return done(null, false);
        }
        if (comparePassword(password, user.password) === false) {
          return done({status:401, message:"Wrong password"}, null);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
