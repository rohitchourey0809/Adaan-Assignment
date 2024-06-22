const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/token");

const registerUser = asyncHandler(async (req, res) => {
  const { phone, email, name, password } = req.body;

  const userExists = await User.findOne({ phone });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ phone, email, name, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      phone: user.phone,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      phone: user.phone,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid phone or password");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      phone: user.phone,
      email: user.email,
      name: user.name,
      profilePhoto: user.profilePhoto,
      pastExperience: user.pastExperience,
      skillSets: user.skillSets,
      educationalQualification: user.educationalQualification,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profilePhoto = req.body.profilePhoto || user.profilePhoto;
    user.pastExperience = req.body.pastExperience || user.pastExperience;
    user.skillSets = req.body.skillSets || user.skillSets;
    user.educationalQualification =
      req.body.educationalQualification || user.educationalQualification;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      phone: updatedUser.phone,
      email: updatedUser.email,
      name: updatedUser.name,
      profilePhoto: updatedUser.profilePhoto,
      pastExperience: updatedUser.pastExperience,
      skillSets: updatedUser.skillSets,
      educationalQualification: updatedUser.educationalQualification,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, authUser, getUserProfile, updateUserProfile };
