const {
    Router
} = require("express");
const router = Router();
const {
    askQuetions,
    allFAQ,
    answers
} = require("../controller/productFAQController");

const passport = require("passport");
router.get("/productFAQ/:id", passport.authenticate("jwt", {
    session: false
}), allFAQ)
router.post("/productAskQuetions/:id", passport.authenticate("jwt", {
    session: false
}), askQuetions)
router.post('/productAnswers/:id', passport.authenticate("jwt", {
    session: false
}), answers);



module.exports = router;