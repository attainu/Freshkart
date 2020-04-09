const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
let auth = {};
// testing
test("Gets the test endpoint", async (done) => {
    const response = await request.get("/test");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("pass!");
    done();
});


test("login user and get token", function (done) {
    jest.setTimeout(50000);
    request.post("/login").send({
        phoneNumber: "1111111111",
        password: "Amol@123"
    }).expect(200).end(function (err, res) {
        auth.token = res.body.token;
        console.log(auth)
        if (err) return done(err);
        done();
    });
});

//get users profile
test('get status code 200 /profile', function (done) {
    request.get('/profile')
        .expect(200).set({
            Authorization: `jwt ${auth.token}`
        })
        .end(function (err, res) {
            if (err) return done(err);
            done();
        });
})

test('get status code 200 /products', function (done) {
    request.get('/products')
        .expect(200)
        .end(function (err, res) {
            if (err) return done(err);
            done();
        });
});

test('get status code 200 /products/:id', function (done) {
    request.get('/products/1')
        .end(function (err, res) {
            expect(res.body.product.id).toBe(1)
            expect(res.status).toBe(200)
            if (err) return done(err);
            done();
        })
});

test('get status code 200 /search/:category', function (done) {
    request.get('/search/vegetables')
        .expect(200)
        .end(function (err, res) {
            if (err) return done(err);
            done();
        });
});

test('get status code 200 /reviews/:id', function (done) {
    request.get('/reviews/1')
        .expect(200).set({
            "Authorization": `jwt ${auth.token}`
        })
        .end(function (err, res) {
            expect(res.status).toBe(200)
            if (err) return done(err);
            done();
        });
})

test('get status code 200 /wishlists', function (done) {
    request.get('/wishlists').set({
        "Authorization": `jwt ${auth.token}`
    }).expect(200).end(function (err, res) {
        if (err) return done(err);
        done();
    })
})

test('get status code 200 /wishlists/:id', function (done) {
    request.post('/addToWishlist/50')
        .expect(200).set({
            Authorization: `jwt ${auth.token}`
        })
        .end(function (err, res) {
            if (err) return done(err);
            done();
        });
})
// Removing item from Wishlist
test('get status code 200 /removeFromWishlist/:id', function (done) {
    request.post('/removeFromWishlist/1')
        .expect(200).set({
            Authorization: `jwt ${auth.token}`
        })
        .end(function (err, res) {
            if (err) return done(err);
            done();
        });
})


//get users all address
test('get status code 200 /address', function (done) {
    request.get('/address')
        .expect(200).set({
            Authorization: `jwt ${auth.token}`
        })
        .end(function (err, res) {
            if (err) return done(err);
            done();
        });
})
//get particular product FAQ
test('get status code 200 /productFAQ/:id', function (done) {
    request.get('/productFAQ/1')
        .expect(200).set({
            Authorization: `jwt ${auth.token}`
        })
        .end(function (err, res) {
            if (err) return done(err);
            done();
        });
})
//ask question on Particular product
test('get status code 200 /productAskQuetions/:id', function (done) {
    request.post('/productAskQuetions/1')
        .expect(200)
        .send({
            question: "validity"
        }).set({
            Authorization: `jwt ${auth.token}`
        })
        .end(function (err, res) {
            if (err) return done(err);
            done();
        });
})
// Get all FAQ On web application
test('get status code 200 /FAQ', function (done) {
    request.get('/FAQ')
        .expect(200)
        .end(function (err, res) {
            if (err) return done(err);
            done();
        });
})
//ASK Question on web
test('get status code 200 /askQuetions', function (done) {
    request.post('/askQuetions')
        .expect(200)
        .send({
            question: "Who is the Owner of FreshKart"
        })
        .end(function (err, res) {
            if (err) return done(err);
            done();
        });
})
// get cart of users
test('get status code 200 /carts', function (done) {
    request.get('/carts')
        .expect(200).set({
            Authorization: `jwt ${auth.token}`
        })
        .end(function (err, res) {
            if (err) return done(err);
            done();
        });
})
// Adding items in cart
test('get status code 200 /addToCart/:id', function (done) {
    request.post('/addToCart/20')
        .expect(200).set({
            Authorization: `jwt ${auth.token}`
        })
        .end(function (err, res) {
            if (err) return done(err);
            done();
        });
})
// Removing items from cart
test('get status code 200 /removeFromCart/:id', function (done) {
    request.post('/removeFromCart/1')
        .expect(200).set({
            Authorization: `jwt ${auth.token}`
        })
        .end(function (err, res) {
            if (err) return done(err);
            done();
        });
})


test("login user and get token", function (done) {
    jest.setTimeout(50000);
    request.post("/loginAdmin").send({
        name: "test",
        password: "test@123"
    }).expect(200).end(function (err, res) {
        console.log(res.body.token)
        auth.adminToken = res.body.adminToken;
        if (err) return done(err);
        done();
    });
});


//get users profile
test('get status code 200 Admin /profile', function (done) {
    request.get('/adminProfile')
        .expect(200).set({
            Authorization: `jwt ${auth.adminToken}`
        })
        .end(function (err, res) {
            if (err) return done(err);
            done();
        });
})

test('get status code 200  Admin /portal', function (done) {
    request.get('/adminPortal')
        .expect(200).set({
            Authorization: `jwt ${auth.adminToken}`
        })
        .end(function (err, res) {
            if (err) return done(err);
            done();
        });
})