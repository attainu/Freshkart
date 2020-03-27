const {
    Router
} = require("express");
const router = Router();
const passport = require("passport");
const {
    addToWishlist,
    wishlists,
    removeFromWishlist
} = require("../controller/wishlistController");

router.get("/wishlists", passport.authenticate("jwt", {
    session: false
}), wishlists)
router.post("/addToWishlist/:id", passport.authenticate("jwt", {
    session: false
}), addToWishlist)

router.post("/removeFromWishlist/:id", passport.authenticate("jwt", {
    session: false
}), removeFromWishlist)

module.exports = router;