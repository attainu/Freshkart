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

const userSchema = {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  phoneNumber: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: function () {
      return this.isThirdPartyUser;
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: function () {
      return this.isThirdPartyUser;
    }
  },
  isThirdPartyUser: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  isConfirmed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  request_id: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ""
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ""
  }
};

class User extends Model {
  static async findByPhoneNumberAndPassword(phoneNumber, password) {
    try {
      const user = await User.findOne({
        where: {
          phoneNumber
        }
      });
      if (!user) throw new Error("Incorrect credentials");
      const isMatched = await compare(password, user.password);
      if (!isMatched) throw new Error("Incorrect credentials");
      return user;
    } catch (err) {
      throw err;
    }
  }

  async generateToken() {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = await sign({
        id: this.getDataValue("id")
      },
      secretKey, {
        expiresIn: (1000 * 60 * 60 * 60)
      }
    );
    this.setDataValue("token", token);
    await this.save();
  }
}

User.init(userSchema, {
  sequelize,
  tableName: "users"
});

User.beforeCreate(async user => {
  if (user.password == null) {
    user.password = null;
  } else {
    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword;
  }
});

User.beforeUpdate(async user => {
  if (user.changed("password")) {
    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword;
  }
});

module.exports = User;