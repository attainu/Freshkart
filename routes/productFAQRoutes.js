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

//get FAQ of  Product (only user can do it)
router.get("/productFAQ/:id", passport.authenticate("jwt", {
    session: false
}), allFAQ)

// Ask question on product ( only user can do it)
router.post("/productAskQuetions/:id", passport.authenticate("jwt", {
    session: false
}), askQuetions)

// Give answer of question (Only Admin Can do it)
router.post('/productAnswers/:id', passport.authenticate('admin-rule', {
    session: false
}), answers);



module.exports = router;