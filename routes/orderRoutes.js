const {
  Router
} = require("express");
const router = Router();
const passport = require("passport");
const {
  order,
  verify,
  status
} = require("../controller/orderController");

// Place order
router.post(
  "/orders",
  passport.authenticate("jwt", {
    session: false
  }),
  order
);
// Do payment by razorpay
router.post("/verify", verify);
// Accept r Reject Order (Only Admin can do it )
router.post(
  "/orderStatus/:id",
  passport.authenticate('admin-rule', {
    session: false
  }),
  status
);

module.exports = router;