const User = require("./User.model");

const getUserByEmail = async email => {
  return await User.findOne({ email });
};

const registerUser = async payload => {
  const user = new User(payload);
  return await user.save();
};

module.exports = {
  getUserByEmail,
  registerUser
};
