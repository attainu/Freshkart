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

router.post(
  "/orders",
  passport.authenticate("jwt", {
    session: false
  }),
  order
);
router.post("/verify", verify);
router.post(
  "/orderStatus/:id",
  passport.authenticate('admin-rule', {
    session: false
  }),
  status
);

module.exports = router;