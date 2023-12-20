import IncorretRequest from './incorrectRequest.js';

class ValidationError extends IncorretRequest {
  constructor(error) {
    const errorMessages = Object.values(error.errors)
      .map((error) => error.message)
      .join('; ');
      
    super(`Following error(s) encountered: ${errorMessages}`);
  }
}

export default ValidationError;
