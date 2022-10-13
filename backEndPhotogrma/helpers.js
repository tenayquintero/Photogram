const generatorError = (code, message) => {
  const error = new Error(message);
  error.httpStatus = code;
  throw error;
};

module.exports = { generatorError };
