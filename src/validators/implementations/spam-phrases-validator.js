const ContentValidator = require('@/validators/base/content-validator');
const { SPAM_PHRASES } = require('@/consts/spam-phrases');

class SpamPhrasesValidator extends ContentValidator {
  constructor() {
    super();
  }

  validate(content) {
    // TODO: Implement spam phrases validation
    return false;
  }
}

module.exports = SpamPhrasesValidator;
