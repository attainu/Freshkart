const {
    Router
} = require("express");
const router = Router();
const passport = require("passport");
const {
    addReview,
    reviews,
    editReview
} = require("../controller/reviewController");

// Get review of particular product
router.get("/reviews/:id", passport.authenticate("jwt", {
    session: false
}), reviews)
// Add review on product (only user Can do it)
router.post("/addReview/:id", passport.authenticate("jwt", {
    session: false
}), addReview)
// Edit review (Only user can do it)
router.post("/editReview/:id", passport.authenticate("jwt", {
    session: false
}), editReview)

module.exports = router;