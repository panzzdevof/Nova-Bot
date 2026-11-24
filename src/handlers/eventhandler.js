const fs = require('node:fs');
const path = require('node:path');

function loadEvents(client) {
  const dir = path.join(__dirname, '..', 'events');
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.js'))) {
    const event = require(path.join(dir, file));
    if (!event.name || typeof event.execute !== 'function') continue;

    const runner = (...args) => event.execute(...args, client);
    if (event.once) client.once(event.name, runner);
    else client.on(event.name, runner);
  }
}

module.exports = { loadEvents };
