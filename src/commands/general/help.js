const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show Nova Bot command menu.'),
  async execute(interaction, client) {
    const groups = new Map();
    for (const command of client.commands.values()) {
      const category = command.category || 'General';
      if (!groups.has(category)) groups.set(category, []);
      groups.get(category).push(`\`/${command.data.name}\` — ${command.data.description}`);
    }

    const embed = new EmbedBuilder()
      .setColor(0x8B5CF6)
      .setTitle('🌌 Nova Bot — Command Center')
      .setDescription('Your server toolkit. Choose a command below.')
      .addFields([...groups.entries()].map(([name, list]) => ({
        name: name,
        value: list.join('\n').slice(0, 1024) || 'No commands yet.',
        inline: true,
      })))
      .setFooter({ text: `${client.commands.size} commands loaded` });
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
