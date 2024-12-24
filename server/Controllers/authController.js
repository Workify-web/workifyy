const crypto = require('crypto');
const url = require('url');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const OTP = require('../Models/otpModel');
const AppError = require('../Utils/appError');
const sendOtpEmail = require('../Utils/mailSender');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');

// Utility function to sign JWT
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Utility function to create and send token
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// Signup Controller
exports.signup = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, terms } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !email || !password || !terms) {
      return next(
        new AppError(
          'All fields must be filled, and you must agree to the terms and conditions!',
          400
        )
      );
    }

    // Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        new AppError('Email already in use. Please use a different email.', 400)
      );
    }

    // Create a new user
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
      terms,
    });

    // Generate OTP
    const otp = otpGenerator.generate(5, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const hashedOtp = await bcrypt.hash(otp, 12);

    // Store OTP in the database
    await OTP.updateOne(
      { email },
      { otp: hashedOtp, createdAt: Date.now() },
      { upsert: true }
    );

    // Send OTP via email
    await sendOtpEmail(email, otp);

    // Generate token and send a response
    const token = signToken(newUser._id);
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
        otpSent: true,
        message: 'Signup successful! Please check your email for the OTP.',
      },
    });
  } catch (error) {
    next(error);
  }
};

// Generate OTP
// exports.generateOTP = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).send('User not found.');

//     const otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       specialChars: false,
//     });
//     const hashedOtp = await bcrypt.hash(otp, 12);

//     await OTP.updateOne(
//       { email },
//       { otp: hashedOtp, createdAt: Date.now() },
//       { upsert: true }
//     );

//     await sendOtpEmail(email, otp); // Send plain OTP to email
//     res.status(200).send('OTP sent to your email.');
//   } catch (err) {
//     res.status(500).send('Error generating OTP.');
//   }
// };
// Verify OTP Controller
exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    // Debug: Check incoming request
    console.log('Request Body:', req.body);

    // Validate required fields
    if (!email || !otp) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email and OTP are required!',
      });
    }

    // Find the OTP record
    const otpRecord = await OTP.findOne({ email });
    console.log('OTP Record:', otpRecord);

    if (!otpRecord) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid email or OTP!',
      });
    }

    // Validate the OTP
    const isMatch = await bcrypt.compare(otp, otpRecord.otp);
    console.log('OTP Match:', isMatch);

    if (!isMatch) {
      return res.status(400).json({
        status: 'fail',
        message: 'Incorrect OTP!',
      });
    }

    // Delete the OTP record after verification
    await OTP.deleteOne({ email });
    console.log('OTP Record Deleted');

    res.status(200).json({
      status: 'success',
      message: 'OTP verified successfully!',
    });
  } catch (error) {
    next(error);
  }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    const onboardSuccess = await User.findOne({ isboarded });

    if (onboardSuccess === false) {
      return next(
        new AppError('You have not completed the onboarding process', 401)
      );
    }

    createSendToken(user, 200, req, res);
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          'User recently changed password! Please log in again.',
          401
        )
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 2) Verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 3) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // // 4) Check if user changed password after the token was issued
      // if (currentUser.changedPasswordAfter(decoded.iat)) {
      //   return next();
      // }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.logout = (req, res) => {
  res.cookies('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.client.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
