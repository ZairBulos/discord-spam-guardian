const SpamPhrasesValidator = require('@/validators/implementations/spam-phrases-validator');

describe('SpamPhrasesValidator Performance', () => {
  let validator;

  beforeEach(() => {
    validator = new SpamPhrasesValidator();
  });

  test('should handle thousands of messages efficiently', () => {
    const spamMessage = '$50 Steam Gift! Visit www.steamgifts.com to claim your prize!';
    const validMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquam quis libero a sagittis. Sed vitae nisi in nisl consequat gravida. Curabitur vitae ante ac magna efficitur maximus sed sed sapien. Duis fringilla porta justo ut mollis. Fusce ut lacinia odio. Integer facilisis orci vitae cursus hendrerit. Curabitur hendrerit sodales luctus. Pellentesque elementum est sollicitudin nibh imperdiet, vitae laoreet felis aliquam. Nullam nec pellentesque metus, nec sodales risus. Ut bibendum feugiat ante, et dignissim tellus hendrerit quis. Sed gravida pharetra vulputate.';

    const messages = [];
    for (let i = 0; i < 100000; i++) {
      messages.push(i % 2 === 0 ? spamMessage : validMessage);
    }

    const startTime = Date.now();

    const results = messages.map((message) => validator.validate(message));

    const endTime = Date.now();

    const duration = endTime - startTime;
    console.log(`Validated ${messages.length} messages in ${duration}ms`);
    
    expect(duration).toBeLessThan(2000);
    expect(results.filter(Boolean).length).toBe(messages.length / 2);
  });
});
