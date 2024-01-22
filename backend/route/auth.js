import passport from 'passport'
import express from 'express'
import authControllers from "../controllers/authControllers.js";
import jwt from "jsonwebtoken";
const router = express.Router()
router.get("/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "auth/login",
  }),
  function (req, res) {
    // Successful authentication, capture user data


    const token = jwt.sign(
      {
        email: req.user.email,
        id: req.user._id,
      },
      "hdskdh",
      { expiresIn: "4h" }
    );


    const userData = {
      id: req.user._id,
      isGoogleAuth: true,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };

    // Set cookies
    res.cookie("id", userData.id, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, //cross-site cookie
    });
    res.cookie("token", token, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, //cross-site cookie
    });
    res.cookie("isGoogleAuth", userData.isGoogleAuth, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, //cross-site cookie
    });
    // Send a postMessage to the main window with the user data
    res.send(`
      <script>
        window.opener.postMessage(${JSON.stringify(userData)}, '*');
        window.close();
      </script>
    `);
  }
);

router.post("/signin", authControllers.signIn);
router.get("/getUser", authControllers.getUser);
router.post("/signup", authControllers.signUp)
router.post("/logout", authControllers.logout);
router.post("/auth/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("done")
  });
});
export default router;
