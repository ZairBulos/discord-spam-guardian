const { REST, Routes } = require('discord.js');

const { loadFiles } = require('./utils/file-loader');
const { TOKEN, CLIENT_ID, GUILD_ID } = require('./consts/config');

const commands = [];
const commandFiles = loadFiles('commands', true);
commandFiles.forEach(({ module, path }) => {
	if ('data' in module && 'execute' in module) {
		commands.push(module.data.toJSON());
	} else {
		console.log(`[WARNING] The command at ${path} is missing a required "data" or "execute" property.`);
	}
});

const rest = new REST().setToken(TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();