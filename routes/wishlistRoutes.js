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

// Get Wishlist of user
router.get("/wishlists", passport.authenticate("jwt", {
    session: false
}), wishlists)
// Add to Wishlist
router.post("/addToWishlist/:id", passport.authenticate("jwt", {
    session: false
}), addToWishlist)
// Remove from wishlist
router.post("/removeFromWishlist/:id", passport.authenticate("jwt", {
    session: false
}), removeFromWishlist)

module.exports = router;