const Nexmo = require("nexmo");

const {
    NEX_API_KEY,
    NEX_API_SECRET,
} = process.env;
const nexmo = new Nexmo({
    apiKey: NEX_API_KEY,
    apiSecret: NEX_API_SECRET
});
nexmo.account.checkBalance((err, result) => {
    console.log(`${result.value.toFixed(2)} EUR`);
});
module.exports = nexmo;