const Nexmo = require("nexmo");
var path = require('path');
const dotenv = require("dotenv");
const {
  POSTGRES_URI,
  POSTGRES_PASSWORD
} = process.env;
const {
  NEX_API_KEY,
  NEX_API_SECRET,
  BRAND_NAME
} = process.env;


const nexmo = new Nexmo({
  apiKey: NEX_API_KEY,
  apiSecret: NEX_API_SECRET
});

// nexmo.account.checkBalance((err, result) => {
//   console.log(`${result.value.toFixed(2)} EUR`);
// });




// //function for sending otp 
// const sendotp = async function (number) {

//   nexmo.verify.request({
//     number: "91" + number,
//     brand: BRAND_NAME
//   }, (err, result) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(result)
//       return result
//     }
//   });

// }
// //Verifying user
// const verifyotp = async function (code, request_id) {
//   nexmo.verify.check({
//     request_id,
//     code
//   }, (err, result) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(result);
//     }
//   })
// }

// module.exports = {
//   sendotp,
//   verifyotp
// }