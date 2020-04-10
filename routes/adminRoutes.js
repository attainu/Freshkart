const {
    Router
} = require("express");
const passport = require("passport");
const {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    changePassword,
    deactivateAccount,
    showAdminData,
    adminPortal
} = require("../controller/adminController");

const router = Router();

// Register As Admin when he have key and password
router.post("/registerAdmin", registerAdmin);
// Login admin
router.post("/loginAdmin", loginAdmin);
// Change Password 
router.post("/changePasswordAdmin", changePassword);
// Deactivate Account of Admin
router.post("/deactivateAccountAdmin", deactivateAccount);


// Routes for PassportJS Logout Admin
router.post("/logoutAdmin", passport.authenticate('admin-rule', {
    session: false
}), logoutAdmin);

// Get Profile of Admin
router.get(
    "/adminProfile",
    passport.authenticate('admin-rule', {
        session: false
    }),
    showAdminData
);

// Admin Portal where he can see orders , question and higly sold products
router.get(
    "/adminPortal",
    passport.authenticate('admin-rule', {
        session: false
    }),
    adminPortal
);

module.exports = router;