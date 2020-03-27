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


router.get("/products", getProducts)
router.get("/products/:id", productDetails)
router.get("/search/:category", searchProducts)
router.post('/addproduct', createProduct);



module.exports = router;