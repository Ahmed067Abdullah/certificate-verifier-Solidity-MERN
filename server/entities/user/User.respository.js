const User = require("./User.model");

const registerUser = async payload => {
  const user = new User(payload);
  return await user.save();
};

const getUserByEmail = async email => {
  return await User.findOne({ email });
};

const getUserById = async id => {
  return await User.findById(id);
};

const getFavourites = async id => {
  return await User.findById(id, { favourites: 1 }).populate("favourites")
}

module.exports = {
  getUserById,
  getUserByEmail,
  registerUser,
  getFavourites
};
