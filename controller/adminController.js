const Admin = require("../models/Admin");
const FAQ = require("../models/FAQ");
const PFAQ = require("../models/ProductFAQ");
const Product = require("../models/Product");

module.exports = {
    async registerAdmin(req, res) {
        try {
            if (
                req.body.key == process.env.CREATEADMINKEY &&
                req.body.verify == process.env.CREATEADMINPASS
            ) {
                const admin = await Admin.create({
                    ...req.body,
                });
                res.send({
                    admin,
                    massage: "done",
                });
            } else {
                res.send({
                    massage: "You are not an Admin",
                });
            }
        } catch (err) {
            console.log(err);
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    },
    async loginAdmin(req, res) {
        const {
            name,
            password
        } = req.body;
        if (!name || !password)
            return res.status(400).send("Incorrect credentials");
        try {
            const admin = await Admin.findByNameAndPassword(name, password);
            if (!admin) {
                res.send({
                    error: "invalid Credential",
                    massage: "fail",
                });
            }
            await admin.generateToken();
            const adminToken = admin.adminToken;
            res.cookie("adminToken", adminToken, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
                httpOnly: true,
                sameSite: "none",
            });
            res.status(200).send({
                adminToken,
                massage: "done",
            });
        } catch (err) {
            console.log(err.message);
            res.send({
                error: "invalid Credential",
                massage: "fail",
            });
        }
    },

    async logoutAdmin(req, res) {
        const id = req.user.id;
        try {
            const admin = await Admin.findOne({
                where: {
                    id,
                },
            });
            await admin.setDataValue("adminToken", "");
            await admin.save();
            res.clearCookie("adminToken");
            res.send({
                massage: "done",
            });
        } catch (err) {
            console.log(err.message);
            res.send({
                error: "invalid Credential",
                massage: "fail",
            });
        }
    },

    async changePassword(req, res) {
        const {
            name,
            oldPassword,
            newPassword
        } = req.body;
        if (!name || !oldPassword || !newPassword)
            return res.status(400).send("Bad request");
        try {
            const admin = await Admin.findByNameAndPassword(name, oldPassword);
            if (!admin) {
                return res.send({
                    error: "Incorrect credentials",
                    massage: "fail",
                });
            }
            await admin.update({
                password: newPassword,
            });
            return res.send({
                admin,
                massage: "done",
            });
        } catch (err) {
            console.log(err.message);
            res.send({
                error: "invalid Credential",
                massage: "fail",
            });
        }
    },

    async deactivateAccount(req, res) {
        const {
            name,
            password
        } = req.body;
        if (!name || !password)
            return res.status(400).send("number and password is required");
        try {
            const admin = await Admin.findByNameAndPassword(name, password);
            if (!Admin) {
                return res.status(401).send("Incorrect credentials");
            }
            await Admin.destroy({
                where: {
                    name,
                },
            });
            return res.send({
                massage: "done",
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server Error");
        }
    },

    async showAdminData(req, res) {
        res.status(200).json({
            admin: req.user,
        });
    },

    async adminPortal(req, res) {
        try {
            const faq = await FAQ.findAll({
                where: {
                    answer: "Not Answered Yet",
                },
            });
            const pfaq = await PFAQ.findAll({
                where: {
                    answer: "Not Answered Yet",
                },
            });
            const products = await Product.findAll({
                order: [
                    ["timesSold", "DESC"]
                ],
            });
            res.status(200).send({
                faq,
                pfaq,
                products,
            });
        } catch (err) {
            console.log(err);
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    },
};