const preprocessMessage = require('@/middlewares/preprocess-message');

describe('preprocessMessage', () => {
  test('should convert content to lowercase', () => {
    const input = 'HELLO WORLD';
    const output = preprocessMessage(input);
    expect(output).toBe('hello world');
  });

  test('should trim whitespace from content', () => {
    const input = '   hello world   ';
    const output = preprocessMessage(input);
    expect(output).toBe('hello world');
  });

  test('should remove URLs from content', () => {
    const input = 'Check this out https://example.com';
    const output = preprocessMessage(input);
    expect(output).toBe('check this out');
  });

  test('should remove emojis from content', () => {
    const input = 'Hello 🌟 world 🚀';
    const output = preprocessMessage(input);
    expect(output).toBe('hello world');
  });

  test('should remove special characters from content', () => {
    const input = 'Hello, world! @2025';
    const output = preprocessMessage(input);
    expect(output).toBe('hello world 2025');
  });

  test('should handle empty or invalid input', () => {
    expect(preprocessMessage('')).toBe('');
    expect(preprocessMessage(null)).toBe('');
    expect(preprocessMessage(undefined)).toBe('');
  });
});