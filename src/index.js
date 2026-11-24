const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const config = require('./config');
const { loadCommands } = require('./handlers/commandHandler');
const { loadEvents } = require('./handlers/eventHandler');
require('./database');

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Channel],
});

client.commands = new Collection();
loadCommands(client);
loadEvents(client);

client.login(config.token).catch(error => {
  console.error('[LOGIN] Failed to log in. Check DISCORD_TOKEN and bot configuration.');
  console.error(error.message);
  process.exitCode = 1;
});
