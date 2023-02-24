module.exports = (error, req, res, next) => {
  if (req.sentHeader) {
    return next(error);
  }

  return res.status(error.statusCode || 500).json({
    message: error.message || 'Algo deu errado, por favor tente novamente!',
  });
};
