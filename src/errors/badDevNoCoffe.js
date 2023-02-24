const ErrorWithResponse = require('./errorWithResponse');

class BadDevNoCoffe extends ErrorWithResponse {
  constructor() {
    super('Algo deu errado, por favor tente novamente!', 500);
  }
}

module.exports = BadDevNoCoffe;
