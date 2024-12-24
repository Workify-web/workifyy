require('dotenv').config({ path: './config.env' });
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const session = require('express-session');
const userRouter = require('./Routes/userRoutes');

const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
// const hpp = require('hpp');
const cookieParser = require('cookie-parser');
app.enable('trust proxy', 1);
// MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Additional middleware to handle OPTIONS requests
// app.use((req, res, next) => {
//   if (req.method === 'OPTIONS') {
//     res.header(
//       'Access-Control-Allow-Methods',
//       'GET,HEAD,PUT,PATCH,POST,DELETE'
//     );
//     return res.status(200).json({});
//   }
//   next();
// });


app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Dev env middleware **can be deleted**
app.use((req, res, next) => {
  console.log('Server running 💥💥💥');
  next();
});
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the API!',
  });
});
app.get('/api/test', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is working!' });
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Body parser, reading data from body into req.body
// app.use(express.json({ limit: '10kb' }));
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(cors()); // Enable CORS for all routes

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Route handlers
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `${req.originalUrl} not found`,
  });
});
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message || 'An unexpected error occurred',
  });
});
module.exports = app;
