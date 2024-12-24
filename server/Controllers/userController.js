const User = require('../Models/userModel');
const AppError = require('../Utils/appError');
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.onboarding = async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer')
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Authentication token is missing.',
    });
  }
  try {
    // Verify the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const { tagline, experience, expertise, location, photo, Bio } = req.body;
    if (!tagline || !experience || !expertise || !location || !photo || !Bio) {
      return next(
        new AppError(
          'All fields must be filled, and you must agree to the terms and conditions!',
          400
        )
      );
    }

    // Update or create the onboarding record
    const userOnBoarding = await onBoarding.findOneAndUpdate(
      { userId },
      { tagline, experience, expertise, location, photo, Bio },
      { new: true, upsert: true, runValidators: true }
    );

    if (!userOnBoarding) {
      return res.status(400).json({
        status: 'error',
        message: 'Failed to save onboarding details.',
      });
    }

    res.status(201).json({
      success: true,
      message: 'User successfully registered ',
      newUser,
    });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong while updating profile.',
      error: err.message,
    });
  }
};
