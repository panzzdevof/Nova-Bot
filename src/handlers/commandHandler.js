const fs = require('node:fs');
const path = require('node:path');

function loadCommands(client) {
  const base = path.join(__dirname, '..', 'commands');
  if (!fs.existsSync(base)) return;

  for (const category of fs.readdirSync(base)) {
    const categoryPath = path.join(base, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    for (const file of fs.readdirSync(categoryPath).filter(f => f.endsWith('.js'))) {
      const command = require(path.join(categoryPath, file));
      if (!command.data || typeof command.execute !== 'function') {
        console.warn(`[COMMAND] Skipped invalid command: ${category}/${file}`);
        continue;
      }
      client.commands.set(command.data.name, command);
    }
  }
}

module.exports = { loadCommands };
