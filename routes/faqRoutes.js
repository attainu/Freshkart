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


router.get("/FAQ", allFAQ)
router.post("/askQuetions", askQuetions)
router.post('/answers/:id', passport.authenticate('admin-rule', {
    session: false
}), answers);
router.post('/deleteFAQ/:id', passport.authenticate('admin-rule', {
    session: false
}), deleteFAQ);



module.exports = router;