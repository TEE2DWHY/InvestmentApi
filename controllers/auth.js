const User = require("../models/User");
const asyncWrapper = require("../middleWare/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

const register = asyncWrapper(async (req, res) => {
  //Register new user
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: cryptoJs.AES.encrypt(
      req.body.password,
      process.env.SECRET
    ).toString(),
  });
  res.status(StatusCodes.CREATED).json({
    msg: "user created successfully",
    firstName: newUser.firstName,
    lastName: newUser.lastName,
  });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  //Validate input fields
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide email and password" });
  }
  //Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid Credentials" });
  }
  //Compare Password
  const hashedPassword = cryptoJs.AES.decrypt(
    user.password,
    process.env.SECRET
  );
  const originalPassword = hashedPassword.toString(cryptoJs.enc.Utf8);
  if (originalPassword !== password) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "invalid credentials" });
  }
  //Create user token upon successful login
  const token = jwt.sign(
    { userId: user._id, firstName: user.firstName },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  res.status(StatusCodes.OK).json({ name: user.firstName, token: token });
});

//export controllers
module.exports = { register, login };
