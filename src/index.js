const { TOKEN } = require('./consts/config');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const { loadCommands } = require('./handler/load-commands');
const { loadEvents } = require('./handler/load-events');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

loadCommands(client);
loadEvents(client);

client.login(TOKEN);
