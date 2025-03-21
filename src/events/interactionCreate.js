const { Events, MessageFlags } = require('discord.js');
const permissionCheck = require('@/middlewares/permission-check');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		if (!permissionCheck(interaction)) {
			return await interaction.reply({ 
				content: 'You do not have permission to use this command!',
				ephemeral: true,
			});
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ 
					content: 'There was an error while executing this command!', 
					flags: MessageFlags.Ephemeral 
				});
			} else {
				await interaction.reply({ 
					content: 'There was an error while executing this command!', 
					flags: MessageFlags.Ephemeral 
				});
			}
		}
	}
};
