import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'savefood_secret_key', {
    expiresIn: '30d'
  });
};

export default generateToken;
