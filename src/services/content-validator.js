class ContentValidatorService {
  constructor(validators = []) {
    this.validators = validators;
  }

  isInvalidContent(content) {
    return this.validators.some(validator => validator.validate(content));
  }
}

module.exports = ContentValidatorService;
