const { UserServices } = require("@/services");
const formatResponseAPI = require("@/utils");

const getProfileController = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await UserServices.getUserById(userId);

    delete user.password;

    return res
      .status(200)
      .send(formatResponseAPI.success("Profile fetched successfully", user));
  } catch (err) {
    return res.status(500).send(formatResponseAPI.error(err.message, err));
  }
};

module.exports = getProfileController;
