import AsyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc     Auth user and get token
// @route    GET api/users/login
// @access   Public

const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.sendStatus(401);
    throw new Error("Invalid email or password");
  }
});

// @desc     Register new user
// @route    GET api/users/
// @access   Public

const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.sendStatus(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    res.send(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.sendStatus(400);
    throw new Error("Invalid user data");
  }
});

// @desc     Get user profile
// @route    GET api/users/profile
// @access   Private

const getUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.sendStatus(404);
    throw new Error("User not found");
  }
});

export { authUser, registerUser, getUserProfile };
