const jwt = require("jsonwebtoken");
const { UserServices } = require("../../services");
const bcrypt = require("bcryptjs");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserServices.getUserByEmail(email);

    if (!existingUser) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    const passIsMatch = await bcrypt.compare(password, existingUser.password);

    if (!passIsMatch) {
      return res.status(400).send({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // hapus password dari response
    delete existingUser.password;

    return res.status(200).send({
      data: {
        ...existingUser,
        token,
      },
      message: "Login success",
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal server error",
      details: err.message,
    });
  }
};

module.exports = loginController;
