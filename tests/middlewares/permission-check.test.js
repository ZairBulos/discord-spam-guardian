const permissionCheck = require('@/middlewares/permission-check');

jest.mock('@/consts/config', () => ({
  BOT_OWNER_ID: '1234567890',
}));

describe('permissionCheck', () => {
  const createMockInteraction = (userId, guildOwnerId) => {
    return {
      user: { id: userId },
      guild: guildOwnerId ? { ownerId: guildOwnerId } : null,
    };
  };

  test('should return true for bot owner', () => {
    const interaction = createMockInteraction('1234567890', '9876543210');
    expect(permissionCheck(interaction)).toBe(true);
  });

  test('should return true for server owner', () => {
    const interaction = createMockInteraction('9876543210', '9876543210');
    expect(permissionCheck(interaction)).toBe(true);
  });

  test('should return false if the user is not the bot owner or server owner', () => {
    const interaction = createMockInteraction('1111111111', '9876543210');
    expect(permissionCheck(interaction)).toBe(false);
  });

  test('should return false if the interaction has no guild', () => {
    const interaction = createMockInteraction('1111111111', null);
    expect(permissionCheck(interaction)).toBe(false);
  });
});
