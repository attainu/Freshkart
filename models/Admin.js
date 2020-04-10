const sequelize = require("../db");

const {
    hash,
    compare
} = require("bcryptjs");
const {
    sign
} = require("jsonwebtoken");
const {
    Sequelize,
    Model
} = require("sequelize");


const adminSchema = {
    name: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    adminToken: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
    }
};

class Admin extends Model {
    static async findByNameAndPassword(name, password) {
        try {
            const admin = await Admin.findOne({
                where: {
                    name
                }
            });
            if (!admin) throw new Error("Incorrect credentials");
            const isMatched = await compare(password, admin.password);
            if (!isMatched) throw new Error("Incorrect credentials");
            return admin;
        } catch (err) {
            throw err;
        }
    }

    async generateToken() {
        const secretKey = process.env.JWT_SECRET_KEY;
        const adminToken = await sign({
                id: this.getDataValue("id")
            },
            secretKey, {
                expiresIn: (1000 * 60 * 60 * 60)
            }
        );
        this.setDataValue("adminToken", adminToken);
        await this.save();
    }
}

Admin.init(adminSchema, {
    sequelize,
    tableName: "admins"
});

Admin.beforeCreate(async admin => {
    const hashedPassword = await hash(admin.password, 10);
    admin.password = hashedPassword;

});

Admin.beforeUpdate(async admin => {
    if (admin.changed("password")) {
        const hashedPassword = await hash(admin.password, 10);
        admin.password = hashedPassword;
    }
});

module.exports = Admin;