import crypto from 'cryptojs';

export const encryptor = (text) => {
  return crypto.AES.encrypt(text, process.env.PASSWORD_SECRET).toString();
};
export const decryptor = (text) => {
  return crypto.AES.decrypt(text, process.env.PASSWORD_SECRET).toString(crypto.enc.Utf8);
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
