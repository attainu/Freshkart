const {
    Router
} = require("express");
const router = Router();
const passport = require("passport");
const {
    addToCart,
    carts,
    removeFromCart,
    updateQuantity

} = require("../controller/cartController");

// Get cart of logged in user
router.get("/carts", passport.authenticate("jwt", {
    session: false
}), carts)

//Add to Cart
router.post("/addToCart/:id", passport.authenticate("jwt", {
    session: false
}), addToCart)

// Remove from Cart
router.post("/removeFromCart/:id", passport.authenticate("jwt", {
    session: false
}), removeFromCart)

// Update quantity before placing order(increase or decrease)
router.post("/updateQuantity/:id", passport.authenticate("jwt", {
    session: false
}), updateQuantity)


module.exports = router;