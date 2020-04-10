const {
  Router
} = require("express");
const passport = require("passport");
const {
  registerUser,
  checkotp,
  loginUser,
  logoutUser,
  changePassword,
  updateProfile,
  forgotPassword,
  resetPassword,
  deactivateAccount,
  showUserData,
  fetchUserFromGoogle,
  fetchUserFromFacebook
} = require("../controller/userController");

const router = Router();

// Register User ( verified by otp)
router.post("/register", registerUser);
//Check otp
router.post("/checkotp", checkotp);
// Login as user
router.post("/login", loginUser);
// Change password ( by giving old password)
router.post("/changePassword", changePassword);
//Update Profile ( only Name and Email can Update)
router.post("/updateProfile", updateProfile);
// Forgot password (verification by otp Nexmo)
router.post("/forgotPassword", forgotPassword);
//Reset password by putting OTP
router.post("/resetPassword", resetPassword);
// Deacivate Account
router.post("/deactivateAccount", deactivateAccount);


// Routes for PassportJS Logout ( if user id logged in)
router.post("/logout", passport.authenticate("jwt", {
  session: false
}), logoutUser);
// get profile when logged in and show profile and Adrress of user
router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false
  }),
  showUserData
);

// Gooogle redirect
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"]
  })
);
// Google route
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:1234/#login"
  }),
  fetchUserFromGoogle
);
// facebook redirect
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    session: false,
    scope: ["email"]
  })
);
// Facebook route
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "http://localhost:1234/#login"
  }),
  fetchUserFromFacebook
);


module.exports = router;