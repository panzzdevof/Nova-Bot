const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Show information about a Discord user.')
    .addUserOption(option => option.setName('user').setDescription('User to inspect').setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const embed = new EmbedBuilder()
      .setColor(0x8B5CF6)
      .setTitle(`User Info — ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ size: 256 }))
      .addFields(
        { name: 'User ID', value: user.id, inline: true },
        { name: 'Account created', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:D>`, inline: true },
        { name: 'Bot account', value: user.bot ? 'Yes' : 'No', inline: true },
      );
    await interaction.reply({ embeds: [embed] });
  },
};
