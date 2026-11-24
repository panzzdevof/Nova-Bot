const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Show information about this server.'),
  async execute(interaction) {
    const guild = interaction.guild;
    if (!guild) return interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
    const embed = new EmbedBuilder()
      .setColor(0x8B5CF6)
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL({ size: 256 }))
      .addFields(
        { name: 'Server ID', value: guild.id, inline: true },
        { name: 'Members', value: `${guild.memberCount}`, inline: true },
        { name: 'Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
      );
    await interaction.reply({ embeds: [embed] });
  },
};
