module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
      return interaction.reply({ content: 'This command is not available.', ephemeral: true });
    }

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(`[COMMAND ERROR] /${interaction.commandName}`, error);
      const payload = { content: 'An unexpected error occurred while running this command.', ephemeral: true };
      if (interaction.replied || interaction.deferred) await interaction.followUp(payload);
      else await interaction.reply(payload);
    }
  },
};
