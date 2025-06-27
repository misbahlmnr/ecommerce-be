const { UserServices } = require("../../services");
const bcrypt = require("bcryptjs");
const formatResponseAPI = require("../../utils");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(422)
        .send(formatResponseAPI.error("Please provide all required fields"));
    }

    const existingUser = await UserServices.getUserByEmail(email);

    if (existingUser) {
      return res
        .status(400)
        .send(formatResponseAPI.error("User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserServices.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .send(formatResponseAPI.success("User created", user));
  } catch (err) {
    return res.status(500).send(formatResponseAPI.error(err.message, err));
  }
};

module.exports = registerController;
