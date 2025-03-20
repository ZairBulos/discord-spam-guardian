require('module-alias/register');

const { Client, Collection, GatewayIntentBits } = require('discord.js');

const { TOKEN } = require('@/consts/config');
const { loadCommands } = require('@/handler/load-commands');
const { loadEvents } = require('@/handler/load-events');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});
client.commands = new Collection();

loadCommands(client);
loadEvents(client);

client.login(TOKEN);
