const {
    Router
} = require("express");
const router = Router();
const {
    createProduct,
    getProducts,
    productDetails,
    searchProducts
} = require("../controller/productController");
const passport = require("passport");

router.get("/products", getProducts)
router.get("/products/:id", productDetails)
router.get("/search/:category", searchProducts)
router.post('/addproduct', passport.authenticate('admin-rule', {
    session: false
}), createProduct);



module.exports = router;