

import passport from "passport";
import User from "../model/user.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
///
async function getUserData(accessToken) {
  console.log(`1:${accessToken}`);
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
  );

 
  const data = await response.json();
   console.log("data", data);
return data
}
///
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "https://book-reviews-41q7.onrender.com/auth/google/callback",
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async function (accessToken, refreshToken, profile, cb) {
      //successful login
      try {
        const userExist = await User.findOne({
          email: profile.emails[0].value,
        });

        const userInfo = await getUserData(accessToken);
        //Check if email exist
        if (!userExist) {
          //Create a User
          const newUser = await User.create({
            email: profile.emails[0].value,
            firstName: userInfo.given_name,
            lastName: userInfo.family_name,
          });

          return cb(null, newUser);
        }
        return cb(null, userExist);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);
   

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .exec()
    .then((user) => {
      // Whatever we return goes to the client and binds to the req.user property
      return done(null, user);
    })
    .catch((err) => {
      return done(err, null);
    });
});
