const prisma = require("@config/prisma");

class UserServices {
  static getUserByEmail = async (email) => {
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return existingUser;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  static createUser = async (data) => {
    try {
      const user = await prisma.user.create({
        data: {
          ...data,
        },
      });
      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}

module.exports = UserServices;
