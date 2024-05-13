const path = require('path');
const fs = require('fs/promises');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

require('dotenv').config();
const { User } = require('../models/user');
const { HttpError, controllerWrapper, sendEmail } = require('../helpers');

const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const register = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw HttpError(409, 'Email alredy in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const verificationEmail = {
    to: email,
    subject: 'Verify Email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`,
  };

  await sendEmail(verificationEmail);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
    avatarURL: newUser.avatarURL,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const existingUser = await User.findOne({ verificationCode });

  if (!existingUser) {
    throw HttpError(401, 'Email not found');
  }

  await User.findByIdAndUpdate(existingUser._id, { verify: true, verificationCode: '' });

  res.json({
    message: 'Email verified succesfully',
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw HttpError(401, 'Email not found');
  }

  if (existingUser.verify) {
    throw HttpError(401, 'Email has alredy verified');
  }

  const verificationEmail = {
    to: email,
    subject: 'Verify Email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${existingUser.verificationCode}">Click to verify email</a>`,
  };

  await sendEmail(verificationEmail);

  res.json({
    message: 'The verification email has been sent successfully',
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw HttpError(401, 'Email or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, existingUser.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid');
  }

  if (!existingUser.verify) {
    throw HttpError(401, 'Email is not verified');
  }

  const payload = {
    id: existingUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '23h',
  });

  await User.findByIdAndUpdate(existingUser._id, { token });

  res.json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  res.json({
    email,
    name,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.json({
    message: 'Logout success',
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUploadPath, originalname } = req.file;
  const filename = `${_id}-${originalname}`;
  const resultUploadPath = path.join(avatarsDir, filename);
  await fs.rename(tempUploadPath, resultUploadPath);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  updateAvatar: controllerWrapper(updateAvatar),
  verifyEmail: controllerWrapper(verifyEmail),
  resendVerifyEmail: controllerWrapper(resendVerifyEmail),
};
