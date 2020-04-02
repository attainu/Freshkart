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

router.post("/register", registerUser);
router.post("/checkotp", checkotp);
router.post("/login", loginUser);
router.post("/changePassword", changePassword);
router.post("/updateProfile", updateProfile);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.post("/deactivateAccount", deactivateAccount);


// Routes for PassportJS
router.post("/logout", passport.authenticate("jwt", {
  session: false
}), logoutUser);

router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false
  }),
  showUserData
);
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:1234/#login"
  }),
  fetchUserFromGoogle
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    session: false,
    scope: ["email"]
  })
);

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "http://localhost:1234/#login"
  }),
  fetchUserFromFacebook
);


module.exports = router;