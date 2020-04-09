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

router.post("/registerAdmin", registerAdmin);
router.post("/loginAdmin", loginAdmin);
router.post("/changePasswordAdmin", changePassword);
router.post("/deactivateAccountAdmin", deactivateAccount);


// Routes for PassportJS
router.post("/logoutAdmin", passport.authenticate('admin-rule', {
    session: false
}), logoutAdmin);

router.get(
    "/adminProfile",
    passport.authenticate('admin-rule', {
        session: false
    }),
    showAdminData
);

router.get(
    "/adminPortal",
    passport.authenticate('admin-rule', {
        session: false
    }),
    adminPortal
);

module.exports = router;