const { UserServices } = require("../../services");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(422).send({
        message: "Please provide all required fields",
      });
    }

    const existingUser = await UserServices.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).send({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserServices.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).send({
      data: user,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal server error",
      details: err.message,
    });
  }
};

module.exports = registerController;
