const { Events } = require('discord.js');

const metricsService = require('@/services/metrics');
const ContentValidatorService = require('@/services/content-validator');

const preprocessMessage = require('@/middlewares/preprocess-message');
const SpamPhrasesValidator = require('@/validators/implementations/spam-phrases-validator');

const validatorService = new ContentValidatorService([ new SpamPhrasesValidator() ]);

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot || !message.guild) return;
    
    const content = preprocessMessage(message.content);
    const hasInvalidContent = validatorService.isInvalidContent(content);

    if (hasInvalidContent) {
      await message.delete();
      metricsService.incrementMessagesDeleted();
    }
  }
};
