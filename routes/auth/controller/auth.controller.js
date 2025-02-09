import models from '../../../models/zindex.js';
import response from '../../../utils/response.util.js';
import jwt from 'jsonwebtoken';
import {
  encryptor,
  decryptor,
  generateAccessToken,
  generateRefreshToken,
} from '../../../utils/helper.util.js';
import { authValidator } from '../validator/auth.validator.js';
const registerUser = async (req, res) => {
  try {
    const { error } = authValidator.userRegistrationSchema.validate(req.body);
    if (error) {
      return response.validationErr(error.details[0].message, res);
    }
    const { name, email, password, designation } = req.body;
    const userModel = models.User;
    const isExist = await userModel.findOne({ email: email.toLowerCase() });
    if (isExist) {
      return response.badRequest('Already registered ! Please login.', res);
    }
    const hashedPassword = encryptor(password);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      designation,
    });
    await newUser.save();
    return response.success('User registered successfully', 1, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const loginUser = async (req, res) => {
  try {
    const { error } = authValidator.userLoginSchema.validate(req.body);
    if (error) {
      return response.validationErr(error.details[0].message, res);
    }
    const { email, password } = req.body;
    const userModel = models.User;
    const isExist = await userModel.findOne({ email: email.toLowerCase() });
    if (!isExist) {
      return response.badRequest('Invalid Credentials', res);
    }
    const decryptedPassword = decryptor(isExist.password);
    if (password !== decryptedPassword) {
      return response.badRequest('Invalid Credentials', res);
    }
    const accessToken = generateAccessToken({ id: isExist._id, designation: isExist.designation });
    const refreshToken = generateRefreshToken({
      id: isExist._id,
      designation: isExist.designation,
    });
    await userModel.findOneAndUpdate({ _id: isExist._id }, { refreshToken });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return response.success('User logged in successfully', { accessToken }, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const getNewAccessToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return response.unauthorized(res);
    }
    const refreshToken = authHeader.split(' ')[1];
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (error, payload) => {
      if (error) {
        return response.unauthorized(res);
      }
      const { id, designation } = payload;
      const userModel = models.User;
      const isExist = await userModel.findOne({ _id: id, designation });
      if (!isExist) {
        return response.unauthorized(res);
      }
      const accessToken = generateAccessToken({
        id: isExist._id,
        designation: isExist.designation,
      });
      return response.success('Access token generated successfully', { accessToken }, res);
    });
  } catch (error) {
    return response.failure(error, res);
  }
};

const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return response.unauthorized(res);
    }
    const userModel = models.User;
    const isExist = await userModel.findOne({ refreshToken });
    if (!isExist) {
      return response.unauthorized(res);
    }
    await userModel.findOneAndUpdate({ _id: isExist._id }, { refreshToken: '' });
    res.clearCookie('refreshToken');
    return response.success('User logged out successfully', res);
  } catch (error) {
    return response.failure(error, res);
  }
};

export const authController = { registerUser, loginUser, getNewAccessToken, logoutUser };
