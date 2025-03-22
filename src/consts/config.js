require('dotenv').config();

module.exports = {
  TOKEN: process.env.DISCORD_TOKEN,
  CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  GUILD_ID: process.env.DISCORD_GUILD_ID,
  BOT_OWNER_ID: process.env.BOT_OWNER_ID,
  METRICS_PORT: process.env.METRICS_PORT,
};
