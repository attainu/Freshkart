const {
    Router
} = require("express");
const router = Router();
const passport = require("passport");
const {
    addAddress,
    address,
    editAddress,
    removeAddress
} = require("../controller/addressController");


// Get all Address of user
router.get("/address", passport.authenticate("jwt", {
    session: false
}), address)
// Add address 
router.post("/addAddress", passport.authenticate("jwt", {
    session: false
}), addAddress)
// Edit Adderss
router.post("/editAddress/:id", passport.authenticate("jwt", {
    session: false
}), editAddress)
// Delete Address
router.post("/removeAddress/:id", passport.authenticate("jwt", {
    session: false
}), removeAddress)

module.exports = router;