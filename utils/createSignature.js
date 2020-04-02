const crypto = require("crypto");

module.exports = (razorpayOrderId, razorPayPaymentId) => {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const hmac = crypto.createHmac("sha256", secret);
  const data = `${razorpayOrderId}|${razorPayPaymentId}`;
  hmac.update(data);
  const hash = hmac.digest("hex");
  return hash;
};
