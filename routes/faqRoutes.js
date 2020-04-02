const {
    Router
} = require("express");
const router = Router();
const {
    askQuetions,
    allFAQ,
    answers,
    deleteFAQ
} = require("../controller/FAQController");


router.get("/FAQ", allFAQ)
router.post("/askQuetions", askQuetions)
router.post('/answers/:id', answers);
router.post('/deleteFAQ/:id', deleteFAQ);



module.exports = router;