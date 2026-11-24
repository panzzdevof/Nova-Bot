const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const config = require('./config');

const commands = [];
const base = path.join(__dirname, 'commands');

for (const category of fs.readdirSync(base)) {
  const categoryPath = path.join(base, category);
  if (!fs.statSync(categoryPath).isDirectory()) continue;

  for (const file of fs.readdirSync(categoryPath).filter(f => f.endsWith('.js'))) {
    const command = require(path.join(categoryPath, file));
    if (command.data) commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
  try {
    console.log(`[DEPLOY] Registering ${commands.length} slash commands...`);
    const route = config.guildId
      ? Routes.applicationGuildCommands(config.clientId, config.guildId)
      : Routes.applicationCommands(config.clientId);

    await rest.put(route, { body: commands });
    console.log('[DEPLOY] Slash commands registered successfully.');
    if (!config.guildId) console.log('[DEPLOY] Global commands may take time to appear.');
  } catch (error) {
    console.error('[DEPLOY] Failed:', error);
    process.exitCode = 1;
  }
})();
