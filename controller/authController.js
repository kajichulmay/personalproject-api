const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
  try {
    // get request headers
    // const headers = req.headers;
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
      return res.status(401).json({ message: 'you are unauthorized' });
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'you are unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // decoded { id: , email: , username }

    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: 'you are unauthorized' });
    }
    req.user = user;
    req.data = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

exports.checkAdmin = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json({ message: 'you are unauthorized' });
    }
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ errorUsername: 'username or password is invaild' });
    }
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return res.status(400).json({ errorPassword: 'username or password is invalid' });
    }

    const paylode = {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(paylode, process.env.JWT_SECRET_KEY, { expiresIn: 30 * 30 * 3600 });
    res.json({ message: 'login success', token });
  } catch (err) {
    next(err);
  }
};
exports.register = async (req, res, next) => {
  try {
    const { username, password, confirmPassword, email, firstName, lastName, isAdmin } = req.body;
    const checkUser = await User.findOne({
      where: {
        username,
      },
    });
    if (checkUser) {
      return res.status(400).json({ usernameError: 'username already exists' });
    }
    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });
    if (checkEmail) {
      return res.status(400).json({ emailError: 'This email already exists' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ passwordError: 'password and confirm password did not match' });
    }

    const hasedPassword = await bcrypt.hash(password, 12);
    await User.create({ username, password: hasedPassword, email, firstName, lastName, isAdmin });
    res.status(200).json({ message: 'your account has been created' });
  } catch (err) {
    next(err);
  }
};
