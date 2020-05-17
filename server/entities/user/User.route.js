const express = require("express");
const passport = require('passport');
const userController = require("./User.controller");
const userValidater = require("./User.validation");

const router = express.Router();

router.post("/register", userValidater.validateRegister, userController.register);

router.post("/login", userValidater.validateLogin, userController.login);

router.get("/me",
  userValidater.validateMe,
  passport.authenticate('jwt', { session: false }),
  userController.verifyMe
);

module.exports = router;
