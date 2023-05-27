const errorHandler = (err, req, res, next) => {
  //handle duplicate (unique) keys
  if (err.code === 11000) {
    return res.status(400).json({
      msg: `${Object.keys(err.keyValue)} is taken. Please choose another`,
    });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({
      msg: `${err.message}`,
    });
  }

  return res.status(500).json({ msg: err.message });
};

module.exports = errorHandler;
