const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
require("./db");
require("./utils/passport");
// Init
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:1234",
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", ]

    }));
app.use(express.json());
app.use(passport.initialize());
// user Routes
app.use(require("./routes/userRoutes"));
// User Address Routes
app.use(require("./routes/addressRoutes"));
//product Routes
app.use(require("./routes/productRoutes"));
//cart Routes
app.use(require("./routes/cartRoutes"));
//wishlist Routes
app.use(require("./routes/wishlistRoutes"));
//Review Routes
app.use(require("./routes/reviewRoutes"));
//WEB FAQ Routes
app.use(require("./routes/faqRoutes"));
//Product FAQ Routes
app.use(require("./routes/productFAQRoutes"));
//Order Routes
app.use(require("./routes/orderRoutes"));


app.listen(3000, function () {
    console.log("Server started");
});