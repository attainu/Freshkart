const {
    Router
} = require("express");
const router = Router();
const {
    askQuetions,
    allFAQ,
    answers
} = require("../controller/FAQController");


router.get("/FAQ", allFAQ)
router.post("/askQuetions", askQuetions)
router.post('/answers/:id', answers);



module.exports = router;