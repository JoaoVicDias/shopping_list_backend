const ErrorWithResponse = require('./errorWithResponse');

class InvalidFields extends ErrorWithResponse {
  constructor() {
    super('Campo inválido!', 422);
  }
}

module.exports = InvalidFields;
