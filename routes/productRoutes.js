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
const upload = require("../utils/multer");

router.get("/products", getProducts)
router.get("/products/:id", productDetails)
router.get("/search/:category", searchProducts)
router.post('/addproduct', passport.authenticate('admin-rule', {
    session: false
}), upload.single("fileUpload"), createProduct);


module.exports = router;