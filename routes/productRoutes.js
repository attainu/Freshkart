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

// Get All products
router.get("/products", getProducts)
// Get particular product by id
router.get("/products/:id", productDetails)
// Search by  category
router.get("/search/:category", searchProducts)
// Add Product (only admin can do it )(image uploaded by cloudinary)
router.post('/addproduct', passport.authenticate('admin-rule', {
    session: false
}), upload.single("fileUpload"), createProduct);


module.exports = router;