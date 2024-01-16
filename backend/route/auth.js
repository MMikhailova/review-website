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
      token: token,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };

    // Set cookies
    res.cookie("id", userData.id, {
      secure: true,
    });
    res.cookie("token", userData.token, {
      secure: true
    });
    res.cookie("isGoogleAuth", userData.isGoogleAuth, {
      secure: true,
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
router.get("/getUser/:id", authControllers.getUser);
router.post("/signup", authControllers.signUp)
router.post("/auth/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("done")
  });
});
export default router;
