const ErrorWithResponse = require('../errors/errorWithResponse');

module.exports = (req, res, next) => next(new ErrorWithResponse('Não foi possível encontrar essa rota, por favor tente novamente!', 404));
