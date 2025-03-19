const { loadFiles } = require('@/utils/file-loader');

const loadEvents = (client) => {
  const events = loadFiles('events');

  events.forEach(({ module }) => {
    if (module.once) {
      client.once(module.name, (...args) => module.execute(...args));
    } else {
      client.on(module.name, (...args) => module.execute(...args));
    }
  })
};

module.exports = { loadEvents };