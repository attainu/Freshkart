const {
    Router
} = require("express");
const router = Router();
const passport = require("passport");
const {
    askQuetions,
    allFAQ,
    answers,
    deleteFAQ
} = require("../controller/FAQController");


// Get all Web FAQ
router.get("/FAQ", allFAQ)
// Ask question (anyone can ask)
router.post("/askQuetions", askQuetions)
// Give answer of question (only admin can do it)
router.post('/answers/:id', passport.authenticate('admin-rule', {
    session: false
}), answers);
// Delete FAQ(only Admin can do it)
router.post('/deleteFAQ/:id', passport.authenticate('admin-rule', {
    session: false
}), deleteFAQ);



module.exports = router;