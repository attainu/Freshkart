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

router.get("/carts", passport.authenticate("jwt", {
    session: false
}), carts)
router.post("/addToCart/:id", passport.authenticate("jwt", {
    session: false
}), addToCart)
router.post("/removeFromCart/:id", passport.authenticate("jwt", {
    session: false
}), removeFromCart)
router.post("/updateQuantity/:id", passport.authenticate("jwt", {
    session: false
}), updateQuantity)


module.exports = router;