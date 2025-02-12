import crypto from 'crypto-js';
import jwt from 'jsonwebtoken';
export const encryptor = (text) => {
  const ciphertext = crypto.AES.encrypt(text, process.env.PASSWORD_SECRET).toString();
  return ciphertext;
};

export const decryptor = (text) => {
  const decodedText = decodeURIComponent(text);
  const bytes = crypto.AES.decrypt(decodedText, process.env.PASSWORD_SECRET);
  const decryptedText = bytes.toString(crypto.enc.Utf8);
  return decryptedText;
};

export const generateAccessToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
  });
  return encryptor(token);
};

export const generateRefreshToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
  });
  return encryptor(token);
};
