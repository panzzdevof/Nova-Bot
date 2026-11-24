const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check Nova Bot response time.'),
  async execute(interaction, client) {
    const sent = await interaction.reply({ content: 'Checking latency...', fetchReply: true });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const embed = new EmbedBuilder()
      .setColor(0x8B5CF6)
      .setTitle('Nova Bot — Pong!')
      .addFields(
        { name: 'WebSocket', value: `${client.ws.ping} ms`, inline: true },
        { name: 'Response', value: `${latency} ms`, inline: true },
      )
      .setTimestamp();
    await interaction.editReply({ content: '', embeds: [embed] });
  },
};
