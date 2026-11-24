const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('node:os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Show Nova Bot system information.'),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(0x8B5CF6)
      .setTitle('Nova Bot — System Info')
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        { name: 'Bot', value: client.user.tag, inline: true },
        { name: 'Servers', value: `${client.guilds.cache.size}`, inline: true },
        { name: 'Commands', value: `${client.commands.size}`, inline: true },
        { name: 'Node.js', value: process.version, inline: true },
        { name: 'Platform', value: os.platform(), inline: true },
        { name: 'Uptime', value: `${Math.floor(client.uptime / 1000)} seconds`, inline: true },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
