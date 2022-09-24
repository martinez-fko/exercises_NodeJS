const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

dotenv.config();

const protectSession = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(403).json({
      status: 'error',
      message: 'Invalid session',
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Verify the token's owner
  const user = await User.findOne({
    where: { id: decoded.id, status: 'active' },
  });

  if (!user) {
    return res.status(403).json({
      status: 'error',
      message: 'The owner of the session is no longer active',
    });
  }

  req.sessionUser = user;
  next();
});

// Check the sessionUser to compare to the one that wants to be updated/deleted
const protectUsersAccount = (req, res, next) => {
  const { sessionUser, user } = req;

  if (sessionUser.id !== user.id) {
    return res.status(403).json({
      status: 'error',
      message: 'You are not the owner of this account.',
    });
  }

  next();
};

// Create middleware that only grants access to admin users
const protectAdmin = (req, res, next) => {
  const { sessionUser } = req;

  if (sessionUser.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'You do not have the access level for this data.',
    });
  }

  next();
};

const protectReviewsOwners = (req, res, next) => {
  const { sessionUser, review } = req;

  if (sessionUser.id !== review.userId) {
    return res.status(403).json({
      status: 'error',
      message: 'This review does not belong to you.',
    });
  }

  next();
};

const protectOrdersOwners = (req, res, next) => {
  const { sessionUser, order } = req;

  if (sessionUser.id !== order.userId) {
    return res.status(403).json({
      status: 'error',
      message: 'This review does not belong to you.',
    });
  }

  next();
};

module.exports = {
  protectSession,
  protectUsersAccount,
  protectAdmin,
  protectReviewsOwners,
  protectOrdersOwners,
};
