//fn= function passed as an argument which returns another function (req,res,next) and then its accepts (res,req,next as parameters) If fn throws an error or rejects a promise, .catch(next) will catch it and pass it to the next middleware
module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
