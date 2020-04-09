const User = require("../models/User");
const nexmo = require("../utils/nexmo");
const Address = require("../models/Address");

module.exports = {
  async registerUser(req, res) {
    try {
      const user = await User.create({
        ...req.body,
        isThirdPartyUser: false
      });
      const number = req.body.phoneNumber;
      nexmo.verify.request({
          number: "91" + number,
          brand: process.env.BRAND_NAME
        },
        (err, result) => {
          if (err) {
            console.error("error", err);
          } else if (result.status == 0) {
            user.setDataValue("request_id", result.request_id);
            user.save();
            res.status(200).json({
              result,
              massage: "done"
            });
          } else {
            res.json(result);
          }
        }
      );
    } catch (err) {
      console.log(err);
      if (err.name === "SequelizeValidationError")
        return res.status(400).send(`Validation Error: ${err.message}`);
      res.send(err.message);
    }
  },

  async checkotp(req, res) {
    try {
      const code = req.body.otp;
      const request_id = req.body.request_id;
      const user = await User.findOne({
        where: {
          request_id
        }
      });
      nexmo.verify.check({
          request_id,
          code
        },
        (err, result) => {
          if (err) {
            console.error(err);
          } else if (result.status == 0) {
            user.setDataValue("isConfirmed", true);
            user.save();
            res.status(200).json(result);
          } else {
            res.json(result);
          }
        }
      );
    } catch (err) {
      console.log(err);
      if (err.name === "SequelizeValidationError")
        return res.status(400).send(`Validation Error: ${err.message}`);
      res.send(err.message);
    }
  },

  async loginUser(req, res) {
    const {
      phoneNumber,
      password
    } = req.body;
    if (!phoneNumber || !password)
      return res.send({
        error: "Incorrect credentials",
        massage: "fail"
      });
    try {
      const user = await User.findByPhoneNumberAndPassword(
        phoneNumber,
        password
      );
      if (user.dataValues.isConfirmed) {
        await user.generateToken();
        const token = user.token;
        res.cookie("token", user.token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
          httpOnly: true,
          sameSite: "none"
        });
        res.status(200).json({
          token,
          massage: "done"
        });
      } else {
        const number = user.dataValues.phoneNumber;
        nexmo.verify.request({
            number: "91" + number,
            brand: BRAND_NAME
          },
          (err, result) => {
            if (err) {
              console.error("error", err);
            } else {
              user.setDataValue("request_id", result.request_id);
              user.save();
              return res
                .status(403)
                .send("You havent confirmed your account. Please verify");
            }
          }
        );
      }
    } catch (err) {
      console.log(err.message);
      res.send({
        error: "invalid Credential",
        massage: "fail"
      });
    }
  },

  async logoutUser(req, res) {
    // Get the users json file
    const id = req.user.id;
    try {
      const user = await User.findOne({
        where: {
          id
        }
      });
      await user.setDataValue("token", "");
      await user.save();
      res.clearCookie('token');
      res.send({
        massage: "done"
      });
    } catch (err) {
      console.log(err.message);
      res.send({
        error: "invalid Credential",
        massage: "fail"
      });
    }
  },

  async changePassword(req, res) {
    const {
      phoneNumber,
      oldPassword,
      newPassword
    } = req.body;
    if (!phoneNumber || !oldPassword || !newPassword)
      return res.status(400).send("Bad request");
    try {
      const user = await User.findByPhoneNumberAndPassword(
        phoneNumber,
        oldPassword
      );
      if (!user) {
        return res.status(401).send("Incorrect credentials");
      }
      await user.update({
        password: newPassword
      });
      return res.send({
        user,
        massage: "done"
      });
    } catch (err) {
      console.log(err.message);
      res.send({
        error: "invalid Credential",
        massage: "fail"
      });
    }
  },

  async deactivateAccount(req, res) {
    const {
      phoneNumber,
      password
    } = req.body;
    if (!phoneNumber || !password)
      return res.status(400).send("number and password is required");
    try {
      const user = await User.findByPhoneNumberAndPassword(
        phoneNumber,
        password
      );
      if (!user) {
        return res.send({
          error: "invalid Credential",
          massage: "fail"
        });;
      }
      await User.destroy({
        where: {
          phoneNumber
        }
      });
      return res.send({
        massage: "done"
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  },

  async forgotPassword(req, res) {
    const {
      phoneNumber
    } = req.body;
    if (!phoneNumber) return res.status(400).send("Number required");
    try {
      const user = await User.findOne({
        where: {
          phoneNumber
        }
      });
      if (!user) {
        return res.send({
          massage: "There is no user present. Kindly register first"
        });
      } else {
        nexmo.verify.request({
            number: "91" + phoneNumber,
            brand: BRAND_NAME
          },
          (err, result) => {
            if (err) {
              console.error("error", err);
            } else if (result.status == 0) {
              user.setDataValue("request_id", result.request_id);
              user.save();
              res.status(200).send({
                result,
                massage: "done"
              });
            } else {
              res.send({
                error: "invalid Credential",
                massage: "fail"
              });
            }
          }
        );
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  },

  async resetPassword(req, res) {
    const {
      password,
      request_id,
      otp
    } = req.body;
    try {
      const user = await User.findOne({
        where: {
          request_id
        }
      });
      const code = otp;
      nexmo.verify.check({
          request_id,
          code
        },
        (err, result) => {
          if (err) {
            console.error(err);
          } else if (result.status == 0) {
            console.log(result);
            user.setDataValue("password", password);
            user.save();
            res.status(200).send({
              result,
              massage: "done"
            });
          } else {
            res.send({
              error: "invalid Credential",
              massage: "fail"
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  },

  async updateProfile(req, res) {
    const {
      phoneNumber,
      password,
      email,
    } = req.body;

    if (!phoneNumber || !password) return res.status(400).send("Bad request");
    try {
      const user = await User.findByPhoneNumberAndPassword(
        phoneNumber,
        password
      );
      if (!user) {
        return res.send({
          error: "Incorrect credentials",
          massage: "done"
        });
      }
      await user.update({
        email
      });
      return res.send({
        user,
        massage: "done"
      });
    } catch (err) {
      console.log(err.message);
      res.send({
        error: "invalid Credential",
        massage: "fail"
      });
    }
  },

  async showUserData(req, res) {
    const address = await Address.findAll({
      where: {
        userId: req.user.id
      }
    });
    res.status(200).json({
      user: req.user,
      address
    });
  },

  //Contrllers for passportJS
  async fetchUserFromGoogle(req, res) {
    const user = req.user;
    await user.generateToken();
    console.log(user.token);
    // Send the token as a cookie ..
    res.cookie("token", user.token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
      httpOnly: true,
      sameSite: "none"
    });
    // Redirect to the clients route (http://localhost:1234)
    res.redirect("http://localhost:1234/#dashboard");
  },

  async fetchUserFromFacebook(req, res) {
    const user = req.user;
    await user.generateToken();
    console.log(user.token);
    res.cookie("token", user.token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
      httpOnly: true,
      sameSite: "none"
    });
    // Redirect to the clients route (http://localhost:1234)
    res.redirect("http://localhost:1234/#dashboard");
  }
};