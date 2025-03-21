const SpamPhrasesValidator = require('@/validators/implementations/spam-phrases-validator');

describe('SpamPhrasesValidator', () => {
  let validator;

  beforeEach(() => {
    validator = new SpamPhrasesValidator();
  });

  test('should detect spam phrases', () => {
    const spamMessage = '$50 Steam Gift';
    expect(validator.validate(spamMessage)).toBe(true);
  });

  test('should detect spam phrases with variations', () => {
    const spamMessage = 'Claim your $50 Steam Gift now!';
    expect(validator.validate(spamMessage)).toBe(true);
  });

  test('should detect spam phrases with links', () => {
    const spamMessage = 'Claim your $50 Steam Gift now! Visit http://example.com';
    expect(validator.validate(spamMessage)).toBe(true);
  });

  test('should not detect spam phrases', () => {
    const validMessage = 'The price is $50 on Steam';
    expect(validator.validate(validMessage)).toBe(false);
  });

  test('should not detect partial matches', () => {
    const validMessage = 'Steam Gift Cards are available for $50';
    expect(validator.validate(validMessage)).toBe(false);
  });

  test('should handle empty or invalid input', () => {
    expect(validator.validate('')).toBe(false);
    expect(validator.validate(null)).toBe(false);
    expect(validator.validate(undefined)).toBe(false);
  });
});
