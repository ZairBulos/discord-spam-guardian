const { Events } = require('discord.js');
const ContentValidatorService = require('@/services/content-validator');
const SpamPhrasesValidator = require('@/validators/implementations/spam-phrases-validator');

const validatorService = new ContentValidatorService([ new SpamPhrasesValidator() ]);

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) return;
    
    const content = message.content;
    const hasInvalidContent = validatorService.isInvalidContent(content);

    if (hasInvalidContent) {
      await message.delete();
      console.log(`[WARNING] Deleted message from ${message.author.tag} for containing spam phrases.`);
    }
  }
};
