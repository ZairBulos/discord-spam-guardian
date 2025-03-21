const ContentValidator = require('@/validators/base/content-validator');
const { SPAM_PHRASES } = require('@/consts/spam-phrases');

class SpamPhrasesValidator extends ContentValidator {
  constructor() {
    super();
    this.spamRegexes = SPAM_PHRASES.map(phrase => {
      const escapedPhrase = phrase
        .toLowerCase()
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      return new RegExp(escapedPhrase, 'i');
    });
  }

  validate(content) {
    return this.spamRegexes.some(regex => regex.test(content));
  }
}

module.exports = SpamPhrasesValidator;
