const userRepository = require("./User.respository");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require("../../config/keys");

const sendToken = (payload, res) => {
  jwt.sign(
    payload,
    keys.jwtSecret,
    { expiresIn: 3600 },
    (err, token) => {
      res.json({
        success: true,
        token: `Bearer ${token}`
      });
    }
  );
}

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await userRepository.getUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({ success: false, error: "Email already in use" });
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) throw err;
      const createdUser = await userRepository.registerUser({
        name, email, password: hash
      });
      const payload = { id: createdUser._id, name, email };
      sendToken(payload, res);
    });
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  bcrypt.compare(password, user.password).then(isMatched => {
    if (isMatched) {
      const payload = { id: user.id, name: user.name, email: user.email };
      sendToken(payload, res);
    } else {
      return res.status(400).json({ success: false, error: 'Password incorrect' });
    }
  });
};

const verifyMe = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
};

const getFavourites = async (req, res) => {
  const user = await userRepository.getUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }
  const { favourites } = await userRepository.getFavourites(req.user.id)
  return res.json({ favourites });
}

const addToFavourites = async (req, res) => {
  const user = await userRepository.getUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  const { certificateId } = req.body;
  if (user.favourites.includes(certificateId)) {
    return res.status(400).json({ success: false, error: 'Certificate is already starred' });
  }

  user.favourites.push(certificateId)
  await user.save();
  return res.json({ success: true });
}

const removeFromFavourites = async (req, res) => {
  const user = await userRepository.getUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  const { certificateId } = req.body;
  if (!user.favourites.includes(certificateId)) {
    return res.status(400).json({ success: false, error: 'Certificate is not starred' });
  }

  user.favourites = user.favourites.filter(id => id.toString() !== certificateId);
  await user.save();
  return res.json({ success: true });
}

module.exports = {
  register,
  login,
  verifyMe,
  getFavourites,
  addToFavourites,
  removeFromFavourites
};
