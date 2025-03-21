const { BOT_OWNER_ID } = require('@/consts/config');

const permissionCheck = (interaction) => {
  if (!interaction.guild) return false;
  return isBotOwner(interaction) || isServerOwner(interaction);
};

const isServerOwner = (interaction) => {
  return interaction.guild && interaction.user.id === interaction.guild.ownerId;
};

const isBotOwner = (interaction) => {
  return interaction.user.id === BOT_OWNER_ID;
};

module.exports = permissionCheck;
