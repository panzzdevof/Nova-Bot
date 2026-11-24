module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`[READY] ${client.user.tag} is online.`);
    client.user.setPresence({
      activities: [{ name: '/help | Nova Bot', type: 0 }],
      status: 'online',
    });
  },
};
