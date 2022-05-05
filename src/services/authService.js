const jwt = require('jsonwebtoken');

const API_SECRET = 'ABCDEFGH876543210';

const JWT_CONFIG = {
  expiresIn: '100h',
  algorithm: 'HS256',
};

const generateToken = (user) => jwt.sign({ user }, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);
    const user = decoded.user;

    return user;
  } catch (error) {
    console.log('Token verification error');
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};