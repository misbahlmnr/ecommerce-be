const jwt = require("jsonwebtoken");
const { UserServices } = require("../../services");
const bcrypt = require("bcryptjs");
const formatResponseAPI = require("../../utils");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserServices.getUserByEmail(email);

    if (!existingUser) {
      return res.status(400).send(formatResponseAPI.error("User not found"));
    }

    const passIsMatch = await bcrypt.compare(password, existingUser.password);

    if (!passIsMatch) {
      return res.status(400).send(formatResponseAPI.error("Invalid password"));
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // hapus password dari response
    delete existingUser.password;

    return res.status(200).send(
      formatResponseAPI.success("Login successful", {
        ...existingUser,
        token,
      })
    );
  } catch (err) {
    return res.status(500).send(formatResponseAPI.error(err.message, err));
  }
};

module.exports = loginController;
